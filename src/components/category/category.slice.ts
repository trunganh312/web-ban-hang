import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '~/api/categoryApi';
import { CategoryType } from '~/types/category.type';

interface CategoryState {
  categories: CategoryType[];
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
};

export const getCategoryList = createAsyncThunk('category/getCategoryList', async () => {
  const response = await categoryApi.getAll({ limit: 10, offset: 0 });
  return response;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategoryList.pending, (state) => {
        state.loading = true;
      });
  },
});

export default categorySlice.reducer;
