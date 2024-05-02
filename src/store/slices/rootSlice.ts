import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InitialState, News } from "../types";

const initialState: InitialState = {
  news: [],
};

const rootSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<Partial<User>>) => {
    //   const newUser = { ...state.user, ...action.payload } as User;
    //   if (!state.user) {
    //     return;
    //   }
    //   state.user = newUser;
    // },
    setNews: (state, action: PayloadAction<News[]>) => {
      state.news = action.payload;
    },
    resetStore: () => {
      const resetState = {
        ...initialState,
      };
      return { ...resetState };
    },
  },
});

export const { resetStore, setNews } =
  rootSlice.actions;

export const rootReducer = rootSlice.reducer;
