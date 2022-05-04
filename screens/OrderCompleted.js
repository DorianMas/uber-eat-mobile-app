import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Divider } from "react-native-elements";

import LottieView from "lottie-react-native";

export default function OrderCompleted({ route }) {
  //   const reduxCart = useSelector((state) => state);

  //   const reduxCartArray = reduxCart.cart;

  const { restaurantName, price, order, token } = route.params;

  console.log("restaurantName dans OrderCompleted", restaurantName);
  //Prix total initial

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: "100%", margin: 15, alignItems: "center" }}>
        <LottieView
          source={require("../assets/99883-check-green.json")}
          autoPlay
          loop={false}
          style={{ height: 100, alignSelf: "center", marginVertical: 5 }}
        />

        <View>
          <Text style={styles.orderDescription}>
            Your order at {restaurantName} has been placed for €
            {price.toFixed(2)}
          </Text>
          <View style={{ height: "40%" }}>
            <ScrollView>
              {order.map((dish, index) => {
                return (
                  <View key={index}>
                    <View style={styles.menuItemStyle}>
                      <FoodInfo dish={dish} />
                      <FoodImage dish={dish} />
                    </View>
                    <Divider width={0.5} color="gray" />
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <LottieView
            source={require("../assets/6519-cooking.json")}
            autoPlay
            loop
            style={{ height: 100, alignSelf: "center", marginBottom: 20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

//Sous-composant
const FoodInfo = ({ dish }) => (
  <View style={{ width: 150, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{dish.title}</Text>
    <Text style={{ fontSize: "10" }}>{dish.description}</Text>
    <Text>{dish.price}</Text>
  </View>
);

//Sous-composant
const FoodImage = ({ dish }) => (
  <View>
    <Image
      source={{ uri: dish.image }}
      style={{ width: 70, height: 70, borderRadius: 8 }}
    />
  </View>
);

const styles = StyleSheet.create({
  orderDescription: {
    fontSize: 20,
    marginBottom: 20,
  },
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: "600",
  },
});
