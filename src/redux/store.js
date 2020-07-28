import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
const middlewares = [logger]; // store expects an array from redux , this configuration can be viewed in redux documentation

const store = createStore(rootReducer, applyMiddleware(...middlewares)); // it will take individual values from middlewares and pass in individually (spread operator)

export default store;


