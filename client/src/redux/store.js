// configuring redux toolkit so that user data can be used globally anywhere in the application:

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {user: userReducer},
  // disabling the serializableCheck middleware to avoid the error of serializing the user object: 

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
