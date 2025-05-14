import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import { WeatherData } from "./WeatherComponent"

interface WeatherResultProps {
  weather: WeatherData | null
}

const WeatherResult: React.FC<WeatherResultProps> = ({ weather }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  if (!weather) return null

  const getWeatherIcon = () => {
    const weatherId = weather.weather[0].id
    if (!weatherId) return "cloud"

    if (weatherId >= 200 && weatherId < 300) {
      return "cloud-lightning"
    } else if (weatherId >= 300 && weatherId < 600) {
      return "cloud-rain"
    } else if (weatherId >= 600 && weatherId < 700) {
      return "cloud-snow"
    } else if (weatherId >= 700 && weatherId < 800) {
      return "cloud"
    } else if (weatherId === 800) {
      return "sun"
    } else {
      return "cloud"
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Feather name={getWeatherIcon()} size={64} color="white" />
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
        </View>

        <Text style={styles.weatherDescription}>{weather.weather[0].description}</Text>

        {weather.name && (
          <Text style={styles.location}>
            {weather.name}
            {weather.sys?.country ? `, ${weather.sys.country}` : ""}
          </Text>
        )}

        <View style={styles.detailsContainer}>
          {weather.main.humidity !== undefined && (
            <View style={styles.detailItem}>
              <Feather name="droplet" size={18} color="white" />
              <Text style={styles.detailText}>Humidity: {weather.main.humidity}%</Text>
            </View>
          )}

          {weather.wind?.speed !== undefined && (
            <View style={styles.detailItem}>
              <Feather name="wind" size={18} color="white" />
              <Text style={styles.detailText}>Wind: {weather.wind.speed} m/s</Text>
            </View>
          )}

          {weather.main.feels_like !== undefined && (
            <View style={styles.detailItem}>
              <Feather name="thermometer" size={18} color="white" />
              <Text style={styles.detailText}>Feels like: {Math.round(weather.main.feels_like)}°C</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.forecastButton}>
            <Feather name="calendar" size={16} color="white" />
            <Text style={styles.buttonText}>Forecast</Text>
          </TouchableOpacity>

          <Pressable style={styles.detailsButton} onPress={() => setModalVisible(true)}>
            <Feather name="info" size={16} color="white" />
            <Text style={styles.buttonText}>Details</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Weather Details</Text>

            <View style={styles.modalContent}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Description:</Text>
                <Text style={styles.modalValue}>{weather.weather[0].description}</Text>
              </View>

              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Temperature:</Text>
                <Text style={styles.modalValue}>{weather.main.temp}°C</Text>
              </View>

              {weather.main.feels_like !== undefined && (
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Feels Like:</Text>
                  <Text style={styles.modalValue}>{weather.main.feels_like}°C</Text>
                </View>
              )}

              {weather.main.humidity !== undefined && (
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Humidity:</Text>
                  <Text style={styles.modalValue}>{weather.main.humidity}%</Text>
                </View>
              )}

              {weather.main.pressure !== undefined && (
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Pressure:</Text>
                  <Text style={styles.modalValue}>{weather.main.pressure} hPa</Text>
                </View>
              )}

              {weather.wind?.speed !== undefined && (
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Wind Speed:</Text>
                  <Text style={styles.modalValue}>{weather.wind.speed} m/s</Text>
                </View>
              )}

              {weather.wind?.deg !== undefined && (
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Wind Direction:</Text>
                  <Text style={styles.modalValue}>{weather.wind.deg}°</Text>
                </View>
              )}
            </View>

            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  weatherCard: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  weatherHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  weatherDescription: {
    fontSize: 20,
    color: "white",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  forecastButton: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
  },
  detailsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalContent: {
    marginBottom: 20,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalLabel: {
    fontSize: 16,
    color: "#666",
  },
  modalValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default WeatherResult
