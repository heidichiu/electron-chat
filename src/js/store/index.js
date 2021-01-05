import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "../reducers/auth";
import chatReducer from "../reducers/chats";

export default function configureStore() {
  const middlewares = [thunkMiddleware];

  const store = createStore(
    combineReducers({ chats: chatReducer, auth: authReducer }),
    applyMiddleware(...middlewares)
  );

  return store;
}
