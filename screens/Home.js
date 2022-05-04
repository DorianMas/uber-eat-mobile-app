import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import HeaderTabs from "../components/Home/HeaderTabs";
import SearchBar from "../components/Home/SearchBar";
import Categories from "../components/Home/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../components/Home/RestaurantItems";
import BottomTabs from "../components/Home/BottomTabs";

import { YELP_API_KEY } from "@env";

export default function Home({
  navigation,
  token,
  setToken,
  tokenUser,
  restaurantData,
  setRestaurantData,
}) {
  const [citySelected, setCitySelected] = useState("Paris");
  const [activeTab, setActiveTab] = useState("Delivery");

  useEffect(() => {
    if (typeof token !== String && token !== null) {
      if (token._W === null) {
        setToken(null);
      }
      // else if (token._W !== null) {
      //   const newToken = { ...token };
      //   console.log("newToken =>", newToken);
      //   setToken(newToken._w);
      // }
    }
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${citySelected}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        }
      );
      //   setRestaurantData(response.data);
      setRestaurantData(
        response.data.businesses.filter((business) => {
          if (business.transactions.length === 0) {
            return business.transactions;
          } else {
            return business.transactions.includes(activeTab.toLowerCase());
          }
        })
      );
    };
    fetchData();
  }, [citySelected, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setCitySelected={setCitySelected} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <BottomTabs token={token} setToken={setToken} />
    </SafeAreaView>
  );
}
