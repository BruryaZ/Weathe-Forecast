import type React from "react"
import { useState } from "react"
import {
  Alert,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import WeatherSearch from "./WeatherSearch"
import { Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import WeatherResult from "./WeatherResult"

export interface WeatherData {
  main: {
    temp: number
    humidity?: number
    pressure?: number
    feels_like?: number
  }
  weather: Array<{
    id?: number
    main?: string
    description: string
    icon?: string
  }>
  wind?: {
    speed?: number
    deg?: number
  }
  name?: string
  sys?: {
    country?: string
    sunrise?: number
    sunset?: number
  }
  cod: number
  message?: string
}

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const apiKey = "aad7df59a6e513b8ee44dc47a57c2e15"

  const fetchWeather = async (city: string) => {
    setLoading(true)
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
      const response = await fetch(url)
      const data: WeatherData = await response.json()
      if (data.cod !== 200) {
        Alert.alert("Error", data.message || "Unknown error")
      } else {
        setWeather(data)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  // const getBackgroundImage = () => {
  //   if (!weather) return require('../assets/img2.png')

  //   const weatherId = weather.weather[0].id
  //   if (!weatherId) return require('../assets/img2.png')

  //   if (weatherId >= 200 && weatherId < 300) {
  //     return require('../assets/img2.png') // Thunderstorm
  //   } else if (weatherId >= 300 && weatherId < 600) {
  //     return require('../assets/img2.png') // Rain
  //   } else if (weatherId >= 600 && weatherId < 700) {
  //     return require('../assets/img2.png') // Snow
  //   } else if (weatherId >= 700 && weatherId < 800) {
  //     return require('../assets/img2.png') // Atmosphere
  //   } else if (weatherId === 800) {
  //     return require('../assets/img2.png') // Clear
  //   } else {
  //     return require('../assets/img2.png') // Clouds
  //   }
  // }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {/* <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}> */}
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.header}>
                <Text style={styles.title}>Weather App</Text>
                <TouchableOpacity style={styles.settingsButton}>
                  <Feather name="settings" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <WeatherSearch onSearch={fetchWeather} loading={loading} />

              <WeatherResult weather={weather} />

              {!weather && !loading && (
                <View style={styles.emptyState}>
                  <Feather name="cloud" size={80} color="white" />
                  <Text style={styles.emptyStateText}>Search for a city to get weather information</Text>
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      {/* </ImageBackground> */}
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyStateText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
    maxWidth: "80%",
  },
})

export default WeatherComponent
