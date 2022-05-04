import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import Login from "./screens/Login";
import HistoryOrders from "./screens/HistoryOrders";
import Profile from "./screens/Profile";
import OrderCompleted from "./screens/OrderCompleted";

import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux";

const Stack = createNativeStackNavigator();

export default function App() {
  /*State relatif aux cookies*/
  const [token, setToken] = useState(AsyncStorage.getItem("userToken") || null);
  const [restaurantData, setRestaurantData] = useState();

  if (token !== undefined) {
    console.log("token =>", token);
  }

  // Fonction pour la gestion du cookie de connexion
  const tokenUser = (token) => {
    // Si la fonction reçoit un token en argument
    if (token) {
      //Création du cookie qui est enregistré dans le state prévu à cet effet
      AsyncStorage.setItem("userToken", token);
    } else {
      // Dans le cas contraire, on supprime le cookie
      AsyncStorage.removeItem("userToken");
    }
    setToken(token);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home">
            {(props) => (
              <Home
                {...props}
                tokenUser={tokenUser}
                token={token}
                setToken={setToken}
                restaurantData={restaurantData}
                setRestaurantData={setRestaurantData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="RestaurantDetail">
            {(props) => (
              <RestaurantDetail
                {...props}
                tokenUser={tokenUser}
                token={token}
                restaurantData={restaurantData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="OrderCompleted">
            {(props) => (
              <OrderCompleted
                {...props}
                tokenUser={tokenUser}
                token={token}
                restaurantData={restaurantData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => (
              <Login {...props} tokenUser={tokenUser} token={token} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {(props) => (
              <Profile {...props} tokenUser={tokenUser} token={token} />
            )}
          </Stack.Screen>
          <Stack.Screen name="HistoryOrders">
            {(props) => (
              <HistoryOrders {...props} tokenUser={tokenUser} token={token} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
