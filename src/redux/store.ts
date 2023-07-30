import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import episodes from "./episodes/episodesSlice";
import character from "./character/characterSlice";

export const store = configureStore({
  reducer: {
    episodes,
    character,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
