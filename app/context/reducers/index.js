import { combineReducers } from "redux";
import feedsReducer from "./feedsReducer";
import cartReducer from "./cartReducer";
import userData from "./userReducer";

const myReducer = combineReducers({
  feeds: feedsReducer,
  cartItems: cartReducer,
  userData: userData,
});

export default myReducer;
