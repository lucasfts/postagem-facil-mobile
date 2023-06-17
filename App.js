import { NativeBaseProvider } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListaSolictacoes from "./views/lista-solicitacoes";
import FormularioSolicitacao from "./views/formulario-solicitacao";
import Notificacoes from "./views/notificacoes";
import Conta from "./views/conta";

export default function App() {
  const Tab = createBottomTabNavigator();

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

  return (
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
  );
}
