import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ViewCart() {
  const reduxCart = useSelector((state) => state);

  const reduxCartArray = reduxCart.cart;

  const [modalVisible, setModalVisible] = useState(false);

  //Prix total initial
  let totalPrice = 0;

  // Boucle pour additionner les prix
  for (let i = 0; i < reduxCartArray.length; i++) {
    if (reduxCartArray.length >= 1) {
      totalPrice = totalPrice + Number(reduxCartArray[i].price.slice(1));
    }
  }

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
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 30,
              width: 150,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "white" }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

//Sous-composant
const restaurantTitleModal = () => (
  <View>
    <Text></Text>
  </View>
);

// const checkoutModalContent = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 30,
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: "black",
//           padding: 10,
//           borderRadius: 30,
//           width: 150,
//           alignItems: "center",
//         }}
//       >
//         <TouchableOpacity onPress={() => setModalVisible(false)}>
//           <Text style={{ color: "white" }}>checkout</Text>;
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
