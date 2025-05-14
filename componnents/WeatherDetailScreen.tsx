import type React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const WeatherDetailScreen: React.FC = () => {
  const navigation = useNavigation()

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Weather Details</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.forecastContainer}>
            <Text style={styles.sectionTitle}>5-Day Forecast</Text>
            <View style={styles.forecastList}>
              {[1, 2, 3, 4, 5].map((day) => (
                <View key={day} style={styles.forecastItem}>
                  <Text style={styles.forecastDay}>Day {day}</Text>
                  <Feather name="sun" size={24} color="white" />
                  <Text style={styles.forecastTemp}>24°C</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Additional Information</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Feather name="sunrise" size={24} color="white" />
                <Text style={styles.infoLabel}>Sunrise</Text>
                <Text style={styles.infoValue}>06:30 AM</Text>
              </View>

              <View style={styles.infoItem}>
                <Feather name="sunset" size={24} color="white" />
                <Text style={styles.infoLabel}>Sunset</Text>
                <Text style={styles.infoValue}>07:45 PM</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Feather name="droplet" size={24} color="white" />
                <Text style={styles.infoLabel}>Humidity</Text>
                <Text style={styles.infoValue}>65%</Text>
              </View>

              <View style={styles.infoItem}>
                <Feather name="wind" size={24} color="white" />
                <Text style={styles.infoLabel}>Wind</Text>
                <Text style={styles.infoValue}>5.2 m/s</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Feather name="thermometer" size={24} color="white" />
                <Text style={styles.infoLabel}>Pressure</Text>
                <Text style={styles.infoValue}>1013 hPa</Text>
              </View>

              <View style={styles.infoItem}>
                <Feather name="eye" size={24} color="white" />
                <Text style={styles.infoLabel}>Visibility</Text>
                <Text style={styles.infoValue}>10 km</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  forecastContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  forecastList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastItem: {
    alignItems: "center",
  },
  forecastDay: {
    color: "white",
    marginBottom: 8,
  },
  forecastTemp: {
    color: "white",
    fontWeight: "bold",
    marginTop: 8,
  },
  infoContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    alignItems: "center",
    width: "45%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 16,
  },
  infoLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 8,
  },
  infoValue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
})

export default WeatherDetailScreen