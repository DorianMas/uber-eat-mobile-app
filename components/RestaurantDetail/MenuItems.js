import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Divider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { toggleDish } from "../../redux";

export default function MenuItems({ route }) {
  const dispatch = useDispatch();

  //Appel du State dédié au panier de commande
  const reduxCart = useSelector((state) => state);

  // Fonction pour vérifier le plat sélectionné : si la fonction retourne True, la checkbox restera activée
  const isDishInCart = (dish) =>
    Boolean(reduxCart.cart.find((elem) => elem.title === dish.title));

  // console.log("route =>", route);

  return (
    <ScrollView>
      <View style={{ height: 900 }}>
        {menus.map((dish, index) => {
          return (
            <View key={index}>
              <View style={styles.menuItemStyle}>
                <BouncyCheckbox
                  iconStyle={{ borderColor: "lightgray", borderRadius: 2 }}
                  fillColor="green"
                  onPress={() => {
                    dispatch(toggleDish(dish));
                  }}
                  isChecked={isDishInCart(dish, index)}
                />
                <FoodInfo dish={dish} />
                <FoodImage dish={dish} />
              </View>
              <Divider
                width={0.5}
                color="gray"
                style={{ marginHorizontal: 10 }}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
});

//Sous-composant
const FoodInfo = ({ dish }) => (
  <View style={{ width: 150, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{dish.title}</Text>
    <Text>{dish.description}</Text>
    <Text>{dish.price}</Text>
  </View>
);

//Sous-composant
const FoodImage = ({ dish }) => (
  <View>
    <Image
      source={{ uri: dish.image }}
      style={{ width: 100, height: 100, borderRadius: 8 }}
    />
  </View>
);

//Tableau d'objets des plats proposés
const menus = [
  {
    title: "Tandoori Chickend",
    description: "Amazing Indian dish with tenderloin chicken off the sizzles",
    price: "€19.20",
    image:
      "https://sharkninja-cookingcircle.s3.eu-west-1.amazonaws.com/wp-content/uploads/2020/07/31170104/Tandori-chicken-1-rotated-1.jpg",
  },
  {
    title: "Big Mac",
    description: "Mc Donalds classic burger",
    price: "€5.70",
    image:
      "https://img.ohmymag.com/s3/fromm/cuisine/default_2020-10-22_f8d3fea2-f848-4e70-9d98-dbb6d2526829.jpeg",
  },
  {
    title: "Sushi & Sashimi",
    description: "Salmon Sushi and and Tuna Sashimi",
    price: "€23.20",
    image:
      "https://seachef.com/wp-content/uploads/2018/02/Optimized-shutterstock_1252098172-1200x480.jpg",
  },
  {
    title: "Tacos",
    description: "Tacos Mexican food",
    price: "€15.20",
    image:
      "https://www.maspatule.com/blog/wp-content/uploads/2021/07/IMG_4184-1440x1080.jpg",
  },
];
