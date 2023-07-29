import { createAsyncThunk } from "@reduxjs/toolkit";
import { EpisodesState } from "./types";
import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

const fetchEpisodes = createAsyncThunk<
  EpisodesState,
  { currentPage: number; searchValue: string }
>("episodes/fetchEpisodes", async ({ currentPage, searchValue }) => {
  const curPage = searchValue ? "" : currentPage;
  const response = await axios.get(
    `${BASE_URL}/episode?page=${currentPage}&name=${searchValue}`
  );
  return response.data;
});

export default fetchEpisodes;
