import { createSlice } from "@reduxjs/toolkit";

// defining the initial states of user properties
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};


// signInStart : to start the loading
// signInSuccess : to set the current user and stop loading
// signInFailure : to set the error and stop loading


// creating a slice of user reducer to handle the user state:
const userSlice = createSlice({
  name: "user",
  initialState,
  // defining the reducers for the user slice:
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
        (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

// exporting the actions of the user slice
export const {signInStart,signInSuccess,signInFailure} = userSlice.actions;

// exporting the user reducer AS Default so can be imported by any another file and name it as userReducer:
export default userSlice.reducer;
