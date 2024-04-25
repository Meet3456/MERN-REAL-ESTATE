import { createSlice } from "@reduxjs/toolkit";

// defining the initial states of user properties
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};



// creating a slice of user reducer to handle the user state:
const userSlice = createSlice({
  name: "user",
  initialState,
  // defining the reducers for the user slice:
  reducers: {
    // as sign in starts the loading will be true
    signInStart: (state) => {
      state.loading = true;
    },
    // on successfull sigin the current user will be set and loading will be false and error will be null
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
