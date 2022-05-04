import { View, Text, TouchableOpacity, Alert } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useNavigation } from "@react-navigation/native";

export default function BottomTabs({ token, setToken }) {
  const navigation = useNavigation();

  console.log("token dans BottomTabs =>", token);
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 15,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity>
        <View>
          <FontAwesome5
            name="home"
            size={25}
            style={{ marginBottom: 3, alignSelf: "center" }}
          />
          <Text>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <FontAwesome5
            name="search"
            size={25}
            style={{ marginBottom: 3, alignSelf: "center" }}
          />
          <Text>Browse</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <FontAwesome5
            name="shopping-bag"
            size={25}
            style={{ marginBottom: 3, alignSelf: "center" }}
          />
          <Text>Grocery</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (token === null) {
            Alert.alert("Access denied", "You must be logged to your account", {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "OK",
            });
          } else {
            navigation.navigate("HistoryOrders");
          }
        }}
      >
        <View>
          <FontAwesome5
            name="receipt"
            size={25}
            style={{ marginBottom: 3, alignSelf: "center" }}
          />
          <Text>Orders</Text>
        </View>
      </TouchableOpacity>
      {token === null ? (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View>
            <FontAwesome5
              name="user"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
            />
            <Text>Account</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View>
            <FontAwesome5
              name="user"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
            />
            <Text>Profile</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

// {
//   /**Sous-composant */
// }
// const Icon = ({ icon, text }) => {
//   const navigation = useNavigation();

//   return (
//     <>
//       {icon === "user" ? (
//         <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//           <View>
//             <FontAwesome5
//               name={icon}
//               size={25}
//               style={{ marginBottom: 3, alignSelf: "center" }}
//             />
//             <Text>{text}</Text>
//           </View>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity>
//           <View>
//             <FontAwesome5
//               name={icon}
//               size={25}
//               style={{ marginBottom: 3, alignSelf: "center" }}
//             />
//             <Text>{text}</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//     </>
//   );
// };
