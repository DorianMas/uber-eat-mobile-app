import { configureStore, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    toggleDish: (state, action) => {
      // {type: "cart/toggleDish", payload: object}
      const dishAdded = state.find(
        (elem) => elem.title === action.payload.title
      );
      if (dishAdded !== undefined) {
        const index = state.indexOf(dishAdded);
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
      console.log("Redux cart =>", state);
    },
  },
});

// const userSlice = createSlice({
//   name: "user",
//   initialState: AsyncStorage.get("userToken") || null,
//   reducers: {
//     tokenUser: (state, action) => {
//       if (action.payload) {
//         AsyncStorage.set("userToken", action.payload);
//       } else {
//         AsyncStorage.remove("userToken");
//       }
//       state = action.payload;
//     },
//   },
// });

export const { toggleDish } = cartSlice.actions;
// export const { tokenUser } = userSlice.actions;

// Entrepôt des données et des actions que l'on peut effectuer sur l'application
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    // user: userSlice.reducer,
  },
});

//Action creator
// export const createToggle = (dish) => {
//   console.log("dish", dish);
//   return {
//     type: "cart/toggleDish",
//     payload: dish,
//   };
// };
