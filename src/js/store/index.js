import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "../reducers/app";
import authReducer from "../reducers/auth";
import chatReducer from "../reducers/chats";
import appMiddleware from "./middlewares/app";

export default function configureStore() {
  const middlewares = [thunkMiddleware, appMiddleware];

  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "AUTH_LOGOUT_SUCCESS") {
      state = undefined;
    }

    return mainReducer(state, action);
  };

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
}
