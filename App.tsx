import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import "react-native-gesture-handler"
import WeatherComponent from "./componnents/WeatherComponent"
import WeatherDetailScreen from "./componnents/WeatherDetailScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={WeatherComponent} />
        <Stack.Screen name="Details" component={WeatherDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
