import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
export default rootReducer;
// import { combineReducers } from 'redux';

// import userReducer from './user/user.reducer';
// import cartReducer from './cart/cart.reducer';

// export default combineReducers({
//   user: userReducer,
//   cart: cartReducer
// });