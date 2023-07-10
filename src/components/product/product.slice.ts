import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import productApi from '~/api/productApi';
import { ParamsType } from '~/types/params.type';
import { ProductItemType } from '~/types/product.type';

interface ProductState {
  productList: ProductItemType[];
  loading: boolean;
  page: number;
  quantity: number;
}

const initialState: ProductState = {
  productList: [],
  loading: false,
  page: 0,
  quantity: 0,
};

export const getProductList = createAsyncThunk(
  'product/getProductList',
  async (params: ParamsType) => {
    const response = await productApi.getAll(params);
    return response;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    },

    setQuantity: (state, action) => {
      if (action.payload <= 0) {
        state.quantity = 0;
      } else {
        state.quantity = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductList.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.loading = false;
      })
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
      });
  },
});

export default productSlice.reducer;

export const { setPage, setProductList, setQuantity } = productSlice.actions;
