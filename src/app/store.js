import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./userSlice";
import sweatReducer from "./sweatSlice";
import adminLogReducer from "./adminLogSlice";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const adminPersistConfig = {
    key: 'adminLog',
    storage,
    stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(adminPersistConfig, adminLogReducer);

const rootReducers = combineReducers({
    adminLog: persistedReducer,
    user: userReducer,
    sweat: sweatReducer,
})


export const store = configureStore({
    reducer: rootReducers,
    middleware: [thunk]
}) 

export const persistore = persistStore(store);