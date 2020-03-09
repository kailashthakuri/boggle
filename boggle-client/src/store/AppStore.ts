import { createStore, applyMiddleware } from "redux";
import appReducer from "./AppReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export default function createAppStore() {
  const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}
