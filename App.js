import React, { useContext } from "react";
import { NativeBaseProvider } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListaSolictacoes from "./views/lista-solicitacoes";
import FormularioSolicitacao from "./views/formulario-solicitacao";
import Notificacoes from "./views/notificacoes";
import Conta from "./views/conta";
import { AuthContext, AuthContextProvider } from "./auth/AuthContext";

const AppNavigation = () => {
  const Tab = createBottomTabNavigator();
  const { authResult } = useContext(AuthContext);

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const icons = {
        'Postagens': "ios-list",
        'Postar Encomenda': "ios-create-outline",
        'Endereço': "ios-list",
        'Notificações': 'ios-notifications-outline',
        'Conta': "person-outline",
      };
      let iconName = icons[route.name];

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray"
  });

  return authResult &&
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator initialRouteName="Postagens" screenOptions={screenOptions}>
          <Tab.Screen name="Postagens" component={ListaSolictacoes} />
          <Tab.Screen name="Postar Encomenda" component={FormularioSolicitacao} />
          <Tab.Screen name="Notificações" component={Notificacoes} />
          <Tab.Screen name="Conta" component={Conta} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
}


export default function App() {
  return <AuthContextProvider>
    <AppNavigation />
  </AuthContextProvider>
}