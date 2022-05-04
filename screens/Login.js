import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

export default function Login({ navigation, tokenUser, token }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  console.log("token ====>", token);

  const loginFunc = async () => {
    try {
      if (email && password) {
        const response = await axios.post(
          "https://0420-77-141-92-135.eu.ngrok.io/user/login",
          {
            email: email,
            password: password,
          }
        );

        console.log("response.data =>", response.data);

        tokenUser(response.data.token);
        navigation.navigate("Home");
      } else {
        setError("Please fill all fields");
      }
    } catch (error) {
      // console.log(error.response.status);
      //   console.log(error.response.data);
      //   console.log(error);
      //   console.log(error.response.request);
      console.log(error);
    }
  };

  // fetch("http://192.168.56.1:4000/user/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email: email,
  //     password: password,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((jsonResponse) => console.log("Success: ", jsonResponse))
  //   .catch((error) => console.log("Error: ", error));

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>
            Connect to your account
          </Text>
          <TextInput
            value={email}
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            placeholder="Your Email"
          />
          <TextInput
            value={password}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder="Your Password"
            secureTextEntry={true}
          />
          {/* <TouchableOpacity style={styles.btn} onPress={() => login()}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Log in
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.btn} onPress={loginFunc}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate("SignUp");
            // }}
            style={styles.btn2}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  input: {
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    height: 40,
    width: 300,
    marginTop: 40,
  },
  btn: {
    backgroundColor: "black",
    borderRadius: 20,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  btn2: { marginTop: 40 },
});
