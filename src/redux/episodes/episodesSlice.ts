import { createSlice } from "@reduxjs/toolkit";
import { EpisodesState } from "./types";
import fetchEpisodes from "./asyncAction";
import { getCurrentPage } from "../../utils/utils";

const initialState: EpisodesState = {
  results: [],
  info: null,
  isLoading: false,
  searchValue: "",
  currentPage: 1,
  error: "",
};

const episodesSlice = createSlice({
  name: "episodes",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload.results;
      state.info = action.payload.info;
      state.currentPage = getCurrentPage(action.payload.info!);
    });
    builder.addCase(fetchEpisodes.rejected, (state) => {
      state.error = "ServerError";
      state.isLoading = false;
    });
  },
});

export default episodesSlice.reducer;
