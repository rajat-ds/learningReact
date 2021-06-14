import { combineReducers } from "redux";
import  iceCreamReducer  from "./iceCream/iceCreamReducer";
import  cakeReducer  from "./cake/cakeReducer";

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

export default rootReducer;
