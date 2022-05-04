import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function Profile({ tokenUser, navigation }) {
  const removeTokenUser = async () => {
    try {
      tokenUser(null);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity
        style={styles.logOutContainer}
        onPress={removeTokenUser}
      >
        <Text style={styles.logOutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pictureContainer: {
    borderRadius: 80,
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
    marginRight: 5,
    marginLeft: 50,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonsContainer: {
    paddingLeft: 20,
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 80,
  },
  emailInput: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    height: 40,
    width: 250,
    marginTop: 10,
  },
  usernameInput: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    height: 40,
    width: 250,
    marginTop: 20,
  },
  descriptionInput: {
    borderColor: "red",
    borderWidth: 1,
    height: 100,
    width: 250,
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingBottom: 55,
    alignItems: "flex-start",
  },
  logOutContainer: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    width: "70%",
    marginVertical: 10,
  },
  logOutText: { color: "grey", fontSize: 18, textAlign: "center" },
});
