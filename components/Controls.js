import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Controls({
  onCenter,
  onClear,
  onZoomIn,
  onZoomOut,
  loading,
}) {
  return (
    <View style={styles.container}>
      {/* Nhóm Zoom */}
      <View style={styles.zoomGroup}>
        <TouchableOpacity style={styles.zoomButton} onPress={onZoomIn}>
          <Ionicons name="add-outline" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={onZoomOut}>
          <Ionicons name="remove-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Nút Vị trí của tôi */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#007AFF" }]}
        onPress={onCenter}
      >
        <Ionicons name="locate" size={18} color="white" />
        <Text style={styles.btnText}> Vị trí của tôi</Text>
      </TouchableOpacity>

      {/* Nút Xóa đường đi */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#E53935" }]}
        onPress={onClear}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="trash-outline" size={18} color="white" />
            <Text style={styles.btnText}> Xoá đường đi</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 12,
    bottom: 120,
    alignItems: "flex-end",
  },

  zoomGroup: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  zoomButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 3,
    marginTop: 8,
    width: 160,
  },
  btnText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
});
