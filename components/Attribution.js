import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Attribution = () => (
  <View style={styles.container}>
    <Text style={styles.text}>© OpenStreetMap contributors</Text>
  </View>
);

export default Attribution;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 8,
    bottom: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  text: { fontSize: 11, color: "#333" },
});
