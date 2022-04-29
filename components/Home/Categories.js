import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

export default function Categories() {
  const items = [
    { image: require("../../assets/meals/shopping-bag.png"), text: "Pick-up" },
    {
      image: require("../../assets/meals/soft-drink.png"),
      text: "Soft Drinks",
    },
    { image: require("../../assets/meals/bread.png"), text: "Bakery-items" },
    { image: require("../../assets/meals/fast-food.png"), text: "Fast Foods" },
    { image: require("../../assets/meals/deals.png"), text: "Deals" },
    { image: require("../../assets/meals/coffee.png"), text: "Coffee & Tea" },
    { image: require("../../assets/meals/desserts.png"), text: "Dessert" },
  ];

  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("RestaurantDetail")}
            key={index}
          >
            <View style={{ alignItems: "center", marginRight: 30 }}>
              <Image
                source={item.image}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              />
              <Text style={{ fontSize: 13, fontWeight: "900" }}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
