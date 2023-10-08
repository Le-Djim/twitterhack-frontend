//# Imports:
import { createSlice } from "@reduxjs/toolkit";

//# Set up the initial state:
const initialState = { 
    value: false, 
    likes: 0, 
    isLiked: false };

//# Configure the reducer module:
export const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    changeState: (state) => {
      state.value = !state.value;
    },
    like: (state, action) => {
      state.likes += 1;
    },
    dislike: (state) => {
      state.likes -= 1;
    },
    changeLike: (state) => {
      state.isLiked = !state.isLiked;
    },
  },
});

// Export the reducer:
export const { changeState, like, dislike, changeLike } = tweetSlice.actions;
export default tweetSlice.reducer;