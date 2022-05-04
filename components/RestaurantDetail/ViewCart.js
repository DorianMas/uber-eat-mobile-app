import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import firebase from "../../firebase";

export default function ViewCart({ restaurantName, navigation, token }) {
  const reduxCart = useSelector((state) => state);

  const reduxCartArray = reduxCart.cart;

  const [modalVisible, setModalVisible] = useState(false);

  //Prix total initial
  let totalPrice = 0;

  // Boucle pour additionner les prix des plats sélectionnés
  for (let i = 0; i < reduxCartArray.length; i++) {
    if (reduxCartArray.length >= 1) {
      totalPrice = totalPrice + Number(reduxCartArray[i].price.slice(1));
    }
  }

  console.log("reduxCart.cart =>", reduxCart.cart);

  console.log("token dans ViewCart =>", token);
  const orderFunc = async () => {
    try {
      //On vérifie si l'utilisateur est connecté via son token
      if (token) {
        // Création d'une condition pour adapter le token si
        if (typeof token === String) {
          const response = await axios.post(
            "https://0420-77-141-92-135.eu.ngrok.io/new-order",
            {
              restaurant: restaurantName,
              order: reduxCartArray,
              token: token,
              price: totalPrice.toFixed(2),
            }
          );
          console.log("response.data =>", response.data);
          setModalVisible(false);
          navigation.navigate("OrderCompleted", {
            restaurantName: restaurantName,
            order: reduxCartArray,
            token: token,
            price: totalPrice,
          });
        } else {
          const response = await axios.post(
            "https://0420-77-141-92-135.eu.ngrok.io/new-order",
            {
              restaurant: restaurantName,
              order: reduxCartArray,
              token: token,
              price: totalPrice.toFixed(2),
            }
          );
          console.log("response.data =>", response.data);
          setModalVisible(false);
          navigation.navigate("OrderCompleted", {
            restaurantName: restaurantName,
            order: reduxCartArray,
            token: token,
            price: totalPrice,
          });
        }
      } else {
        // Si pas de token, on renvoie vers la page Login
        setModalVisible(false);
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // const addOrderToFireBase = () => {
  //   const db = firebase.firestore();
  //   db.collection("Orders").add({
  //     items: items,
  //     restaurantName: restaurantName,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   setModalVisible(false);
  // };

  // useEffect(() => {
  //   if (sendRequest === true) {
  //     const response = axios.post("http://localhost:4000/new-order", {
  //       order: reduxCartArray,
  //     });
  //   }
  // }, []);

  return (
    <>
      {totalPrice > 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            top: "55%",
            zIndex: 999,
            position: "absolute",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  paddingRight: "20%",
                }}
              >
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                € {totalPrice.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={styles.modalContainer}
          // onStartShouldSetResponder={() => setModalVisible(false)}
        >
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {reduxCartArray?.map((dish, index) => {
              return (
                <View key={index} style={styles.orderItem}>
                  <Text style={{ fontWeight: "800" }}>{dish.title}</Text>
                  <Text>{dish.price}</Text>
                </View>
              );
            })}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>€{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={orderFunc}
                style={styles.checkoutButton}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    minHeight: "50%",
    borderWidth: 1,
  },
  restaurantName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  totalText: {
    textAlign: "left",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 13,
    marginTop: 20,
    borderRadius: 30,
    position: "relative",
    width: "80%",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
