import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import About from "../components/RestaurantDetail/About";
import MenuItems from "../components/RestaurantDetail/MenuItems";
import ViewCart from "../components/RestaurantDetail/ViewCart";

export default function RestaurantDetail({
  route,
  navigation,
  tokenUser,
  token,
}) {
  return (
    <SafeAreaView>
      <About route={route} />
      <MenuItems route={route} />
      <ViewCart
        navigation={navigation}
        restaurantName={route.params.name}
        token={token}
        tokenUser={tokenUser}
      />
    </SafeAreaView>
  );
}
