import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Episode, EpisodesState } from "./types";
import fetchEpisodes from "./asyncAction";
import { getCurrentPage } from "../../utils/utils";
import { Errors } from "../../enum/Errors";
import { SortParams } from "../../enum/SortParams";

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
  currentItem: null,
  sortParam: SortParams.ID,
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
    setCurrentItem: (state, action: PayloadAction<Episode>) => {
      state.currentItem = action.payload;
    },
    setSortParam: (state, action: PayloadAction<string>) => {
      state.sortParam = action.payload;
    },
    sortResults: (state) => {
      const newArr = [...state.results];

      if (state.sortParam == SortParams.DATE_EARLY) {
        newArr.sort((a, b) => {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        });
      } else if (state.sortParam == SortParams.DATE_RECENT) {
        newArr.sort((a, b) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
      } else if (state.sortParam == SortParams.ID) {
        newArr.sort((a, b) => {
          return a.id - b.id;
        });
      }

      state.results = newArr;
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

export const {
  nextPage,
  setSearchValue,
  clearResults,
  setCurrentItem,
  sortResults,
  setSortParam,
} = episodesSlice.actions;
export default episodesSlice.reducer;
