import React, { forwardRef } from "react";
import { Platform, StyleSheet } from "react-native";
import MapView, { UrlTile, Marker, Polyline } from "react-native-maps";

const MapViewComponent = forwardRef(
  ({ userLoc, destination, routeCoords }, ref) => {
    return (
      <MapView
        ref={ref}
        style={styles.map}
        initialRegion={{
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType={Platform.OS === "android" ? "none" : "standard"}
        showsUserLocation
        showsMyLocationButton={false}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
          maximumZ={19}
          zIndex={0}
        />

        {destination && (
          <Marker coordinate={destination} title={destination.name} />
        )}

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
    );
  }
);

export default MapViewComponent;

const styles = StyleSheet.create({
  map: { flex: 1 },
});
