//import userReducer from "./slices/user.slice";
//import storageSession from "redux-persist/lib/storage/session";
//import { persistReducer, persistStore } from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "./slices/session.slice";
import AppReducer from "./slices/app.slice";
import ModalCadastroEdicaoReducer from "./slices/modalCadastroEdicao.slice";

export const store = configureStore({
    reducer: {
        SessionReducer,
        AppReducer,
        ModalCadastroEdicaoReducer
    }
});

export default store;