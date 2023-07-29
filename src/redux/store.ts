import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import episodes from "./episodes/episodesSlice";

export const store = configureStore({
  reducer: {
    episodes,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
