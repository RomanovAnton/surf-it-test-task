import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EpisodesState } from "./types";
import fetchEpisodes from "./asyncAction";
import { getCurrentPage } from "../../utils/utils";
import { Errors } from "../../enum/Errors";

const initialState: EpisodesState = {
  results: [],
  info: {
    count: null,
    pages: null,
    prev: "",
    next: "",
  },
  isLoading: false,
  searchValue: "",
  currentPage: 1,
  error: "",
};

const episodesSlice = createSlice({
  name: "episodes",
  initialState,

  reducers: {
    nextPage: (state) => {
      if (state.currentPage < state.info!.pages!) {
        state.currentPage += 1;
      }
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.isLoading = false;

      if (state.searchValue) {
        state.results = action.payload.results;
      } else {
        const newArr = [...state.results].concat(action.payload.results);
        state.results = newArr;
      }

      state.info = action.payload.info;
      state.currentPage = getCurrentPage(action.payload.info!);
      state.error = "";
    });
    builder.addCase(fetchEpisodes.rejected, (state, payload) => {
      state.isLoading = false;
      if (payload.error.code === Errors.NOT_FOUND) {
        state.results = [];
        state.error = Errors.NOT_FOUND;
        return;
      }
      state.error = "ServerError";
    });
  },
});

export const { nextPage, setSearchValue, clearResults } = episodesSlice.actions;
export default episodesSlice.reducer;
