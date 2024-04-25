// configuring redux toolkit so that user data can be used globally anywhere in the application:

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// combineReducers is used to combine multiple reducers into a single reducer object. In this case, we are combining the userReducer into a single rootReducer object.
const rootReducer = combineReducers({
  user: userReducer,
});

// purpose of Redux Persist is to persist the Redux store between sessions, ensuring that the application's state is saved and can be reloaded even after the app is restarted or the page is refreshed.
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// persistReducer is used to create a new reducer with persistence capabilities. It takes the persistConfig and the rootReducer(which contains all the reducers) as arguments.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore is used to create a Redux store with the given reducer. In this case, we are using the persistedReducer as the reducer for the store.
export const store = configureStore({
  reducer: persistedReducer,

  // disabling the serializableCheck middleware to avoid the error of serializing the user object:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// persistStore is used to create a persistor object that can be used to persist the Redux store. It takes the store as an argument.
export const persistor = persistStore(store);
