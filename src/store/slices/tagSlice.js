import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('tag')
  ? JSON.parse(localStorage.getItem('tag'))
  : { optionsTags: [] };

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setOptionsTags: (state, action) => {
      state.optionsTags = action.payload;
      localStorage.setItem('tag', JSON.stringify(state));
    },
    clearTags: (state, action) => {
      state.optionsTags = [];
      localStorage.setItem('tag', JSON.stringify(state));
    },
  },
});

export const { setOptionsTags, clearTags } = tagSlice.actions;

export default tagSlice.reducer;
