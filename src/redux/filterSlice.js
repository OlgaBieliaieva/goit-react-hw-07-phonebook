import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { filterQuery: '' },
  reducers: {
    filter: (state, action) => {
      state.filterQuery = action.payload;
    },
  },
});

export const { filter } = filterSlice.actions;

// Selectors

export const getFilterQuery = state => state.filter.filterQuery;
