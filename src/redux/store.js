// import { createStore, applyMiddleware } from "redux";
// import { persistStore } from "redux-persist";
// import logger from "redux-logger";
// import rootReducer from "./root-reducer";
// const middlewares = [logger]; // store expects an array from redux , this configuration can be viewed in redux documentation

// export const store = createStore(rootReducer, applyMiddleware(...middlewares)); // it will take individual values from middlewares and pass in individually (spread operator)
// export const persistor = persistStore(store);

import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistStore };
