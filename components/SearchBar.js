import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

const SearchBar = ({ onSearch, results, onSelectResult }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (text) => {
    setQuery(text);
    if (text.trim().length === 0) return;
    setLoading(true);
    await onSearch(text);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tìm kiếm địa điểm..."
        style={styles.input}
        value={query}
        onChangeText={handleChange}
      />

      {loading && <ActivityIndicator style={{ marginTop: 6 }} />}
      {results.length > 0 && (
        <FlatList
          style={styles.results}
          data={results}
          keyExtractor={(item) => item.place_id?.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onSelectResult(item)}
            >
              <Text numberOfLines={2}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: { position: "absolute", top: 36, left: 12, right: 12 },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  results: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 6,
    maxHeight: 200,
    elevation: 3,
  },
  item: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#ccc",
  },
});
