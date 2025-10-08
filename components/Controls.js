import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const Controls = ({ onCenter, onClear, loading }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.btn} onPress={onCenter}>
      <Text style={styles.btnText}>Vị trí của tôi</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.btn, { marginTop: 8 }]} onPress={onClear}>
      <Text style={styles.btnText}>Xoá đường đi</Text>
    </TouchableOpacity>

    {loading && <ActivityIndicator style={{ marginTop: 8 }} />}
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 12,
    bottom: 120,
    alignItems: "flex-end",
  },
  btn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 3,
  },
  btnText: { color: "white" },
});
