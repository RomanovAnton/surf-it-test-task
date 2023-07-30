import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "./types";

const initialState: { info: Character | null } = {
  info: null,
};

const characterSlice = createSlice({
  name: "character",
  initialState,

  reducers: {
    setCurrentCharacter: (state, action: PayloadAction<Character>) => {
      state.info = action.payload;
    },
  },
});

export const { setCurrentCharacter } = characterSlice.actions;
export default characterSlice.reducer;
