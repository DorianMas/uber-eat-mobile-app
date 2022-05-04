import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";

import React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

export default function HistoryOrders({ navigation, token }) {
  const [orders, setOrders] = useState();
  console.log("token dans History =>", token);
  useEffect(() => {
    // if (typeof token === String) {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://0420-77-141-92-135.eu.ngrok.io/orders-history?token=${token}`
        );
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
    // }
    // else {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get(
    //         `https://3c26-77-141-92-135.eu.ngrok.io/orders-history?token=${token._W}`
    //       );
    //       console.log(response.data);
    //       setOrders(response.data);
    //     } catch (error) {
    //       console.log(error.response); // contrairement au error.message d'express
    //     }
    //   };
    //   fetchData();
    // }
  }, [token]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Old orders</Text>
      <ScrollView style={{ width: "100%" }}>
        {orders?.map((order, index) => {
          return (
            <View key={index} style={styles.orderContainer}>
              <Text style={styles.restaurantName}>{order.restaurant}</Text>

              <View style={styles.orderDetails}>
                <Text>{order.dishes.length} plats</Text>
                {/* <Text>
              {order.dishes.reduce(
                (previousValue, currentValue) =>
                  Number(previousValue.price.replace("€", "")) +
                  Number(currentValue.price.replace("€", ""))
              )}
            </Text> */}
                <Text>{order.date.slice(0, 10)}</Text>
              </View>
              {/* <PricePerOrder order={order} /> */}
              <View style={styles.btn}>
                <TouchableOpacity
                // onPress={
                // () => navigation.navigate("")
                // }
                >
                  <Text style={styles.textBtn}>Order again</Text>
                </TouchableOpacity>
              </View>
              <Divider
                width={0.5}
                color="grey"
                style={{ marginHorizontal: 10 }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 25,
  },
  orderContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  restaurantName: {
    flex: 1.5,
    margin: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  orderDetails: {
    flex: 1,
    margin: 5,
  },
  btn: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
  },
  textBtn: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  // input: {
  //   borderBottomColor: "gray",
  //   borderBottomWidth: 2,
  //   height: 40,
  //   width: 300,
  //   marginTop: 40,
  // },
  // btn: {
  //   backgroundColor: "black",
  //   borderRadius: 20,
  //   height: 50,
  //   width: 200,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 40,
  // },
  // btn2: { marginTop: 40 },
});

// const PricePerOrder = async ({ order }) => {
//   //   const price = order.dishes.forEach((element) => {
//   //     console.log(element.price.slice(1));
//   //   });

//   return (
//     <View>
//       <Text>{order.}</Text>
//     </View>
//   );
// };
