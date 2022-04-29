import { View, Text, Image } from "react-native";
import React from "react";

export default function About({ route }) {
  const { name, image, price, reviews, rating, categories } = route.params;

  const formattedCategories = categories
    .map((category) => category.title)
    .join(" • ");

  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎟️ • ${rating} ⭐ (${reviews}+)`;

  return (
    <View
      style={{
        borderBottomWidth: "1px",
        borderBottomColor: "gray",
        marginBottom: 20,
      }}
    >
      <RestaurantImage image={image} />
      <RestaurantTitle name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

//Sous-composant
const RestaurantImage = ({ image }) => (
  <Image source={{ uri: image }} style={{ width: "100%", height: 150 }} />
);

//Sous-composant
const RestaurantTitle = ({ name }) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 20,
      marginHorizontal: 15,
    }}
  >
    {name}
  </Text>
);

//Sous-composant
const RestaurantDescription = ({ description }) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
      marginBottom: 20,
    }}
  >
    {description}
  </Text>
);
