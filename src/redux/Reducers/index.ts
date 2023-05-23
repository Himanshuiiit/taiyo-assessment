import { ContactReducer } from "./ContactReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  contacts: ContactReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
