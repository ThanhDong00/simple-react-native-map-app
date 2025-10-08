import React, { useEffect, useRef, useState } from "react";
import { View, Alert, ActivityIndicator, Text } from "react-native";
import * as Location from "expo-location";
import MapViewComponent from "./components/MapViewComponent";
import SearchBar from "./components/SearchBar";
import Controls from "./components/Controls";
import Attribution from "./components/Attribution";
import { searchPlaces, getRoute } from "./utils/api";

export default function App() {
  const mapRef = useRef(null);
  const [userLoc, setUserLoc] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  const [mapRegion, setMapRegion] = useState(null);
  // Lấy vị trí hiện tại của người dùng
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Không có quyền", "Ứng dụng cần quyền truy cập vị trí.");
        setLoading(false);
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setUserLoc(pos.coords);
      setLoading(false);
    })();
  }, []);

  // Tìm kiếm địa điểm
  const handleSearch = async (query) => {
    const results = await searchPlaces(query);
    setSearchResults(results);
  };

  // Khi chọn một địa điểm từ danh sách kết quả
  const handleSelectPlace = async (item) => {
    const dest = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      name: item.display_name,
    };
    setDestination(dest);
    setSearchResults([]);

    if (!userLoc) {
      Alert.alert("Lỗi", "Không có vị trí hiện tại.");
      return;
    }

    setRouteLoading(true);
    const route = await getRoute(userLoc, dest);
    setRouteCoords(route);
    setRouteLoading(false);
  };

  // Đưa bản đồ về vị trí hiện tại
  const centerOnUser = () => {
    if (userLoc && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        400
      );
    }
  };

  // Xóa tuyến đường
  const clearRoute = () => {
    setDestination(null);
    setRouteCoords([]);
  };

  const MIN_DELTA = 0.0005;

  const zoomIn = () => {
    if (!mapRef.current || !mapRegion) return;

    const newLatDelta = Math.max(mapRegion.latitudeDelta / 3, MIN_DELTA);
    const newLonDelta = Math.max(mapRegion.longitudeDelta / 3, MIN_DELTA);

    mapRef.current.animateToRegion(
      {
        ...mapRegion,
        latitudeDelta: newLatDelta,
        longitudeDelta: newLonDelta,
      },
      250
    );
  };

  const zoomOut = () => {
    if (!mapRef.current || !mapRegion) return;

    const newZoom = mapRegion.latitudeDelta * 2;

    mapRef.current.animateToRegion(
      {
        ...mapRegion,
        latitudeDelta: newZoom,
        longitudeDelta: newZoom,
      },
      300
    );
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Đang xác định vị trí...</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <MapViewComponent
        ref={mapRef}
        userLoc={userLoc}
        destination={destination}
        routeCoords={routeCoords}
        onRegionChangeComplete={setMapRegion}
      />

      <SearchBar
        onSearch={handleSearch}
        results={searchResults}
        onSelectResult={handleSelectPlace}
      />

      <Controls
        onCenter={centerOnUser}
        onClear={clearRoute}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        loading={routeLoading}
      />

      <Attribution />
    </View>
  );
}
