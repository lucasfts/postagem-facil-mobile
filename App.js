import { NativeBaseProvider, Box, VStack, Center, Drawer } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Form from "./components/form";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Tab = createBottomTabNavigator();

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const icons = {
        Home: "ios-information-circle-outline",
        Search: "ios-list",
        Cart: "ios-cart-outline",
        Account: "person-circle",
      };
      let iconName = icons[route.name];

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray"
  });

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Tab.Screen name="Home" component={() => <div>Home</div>} />
          <Tab.Screen name="Cart" component={Form} />
          <Tab.Screen name="Search" component={() => <div>Search</div>} />
          <Tab.Screen name="Account" component={() => <div>Account</div>} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
