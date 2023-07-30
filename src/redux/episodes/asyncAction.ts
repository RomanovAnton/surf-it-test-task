import { createAsyncThunk } from "@reduxjs/toolkit";
import { EpisodesState } from "./types";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const fetchEpisodes = createAsyncThunk<
  EpisodesState,
  { currentPage: number; searchValue: string }
>("episodes/fetchEpisodes", async ({ currentPage, searchValue }) => {
  const curPage = searchValue ? "" : currentPage;
  const response = await axios.get(
    `${BASE_URL}/episode?page=${curPage}&name=${searchValue}`
  );
  return response.data;
});

export default fetchEpisodes;
