//import userReducer from "./slices/user.slice";
//import storageSession from "redux-persist/lib/storage/session";
//import { persistReducer, persistStore } from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "./slices/session.slice";
import AppReducer from "./slices/app.slice";

export const store = configureStore({
    reducer: {
        SessionReducer,
        AppReducer
    }
});

export default store;