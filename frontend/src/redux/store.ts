//import userReducer from "./slices/user.slice";
//import storageSession from "redux-persist/lib/storage/session";
//import { persistReducer, persistStore } from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "./slices/session.slice";

export const store = configureStore({
    reducer: SessionReducer
});

export default store;