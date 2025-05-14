import type React from "react"
import { useState } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native"
import { Feather } from "@expo/vector-icons"

interface WeatherSearchProps {
  onSearch: (city: string) => void
  loading: boolean
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState<string>("")

  const handleSearch = () => {
    if (!city.trim()) {
      Alert.alert("Error", "Please enter a city name")
      return
    }
    Keyboard.dismiss()
    onSearch(city)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
          editable={!loading}
        />
        {city.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => setCity("")} disabled={loading}>
            <Feather name="x" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.searchButton, loading && styles.searchButtonDisabled]}
        onPress={handleSearch}
        disabled={loading}
      >
        {loading ? <ActivityIndicator size="small" color="white" /> : <Feather name="search" size={20} color="white" />}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: "100%",
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
      android: {
        paddingVertical: 8,
      },
    }),
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    backgroundColor: "#4A90E2",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonDisabled: {
    backgroundColor: "#7EB3F2",
  },
})

export default WeatherSearch
