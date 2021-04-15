import { combineReducers } from "redux";
import methodsReducer from "./methodsReducer";

const rootReducer = combineReducers({
  methods: methodsReducer,
});

export default rootReducer;