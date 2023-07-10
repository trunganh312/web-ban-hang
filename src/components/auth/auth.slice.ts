import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi, { DataAuthType, DataProfile } from '~/api/authApi';
import userApi, { User } from '~/api/userApi';

export const login = createAsyncThunk('auth/login', async (data: DataAuthType) => {
  const response = await authApi.login(data);
  return response;
});

export const register = createAsyncThunk('auth/register', async (data: DataAuthType) => {
  const response = await authApi.addUser(data);
  return response;
});

export const getProfile = createAsyncThunk('auth/profile', async (token: string | null) => {
  const response = await authApi.getUserProfile(token);
  return response;
});

interface AuthState {
  token: string | null;
  loading: boolean;
  user: DataProfile | null;
  cartList: any[];
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  loading: false,
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  cartList: JSON.parse(localStorage.getItem('cartList') || '[]'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = null;
    },

    updateProfile: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    addCartList: (state, action) => {
      const index = state.cartList.findIndex(
        (item) => item.id === action.payload.id && item.userId === action.payload.userId
      );
      if (index >= 0) {
        state.cartList[index].quantity += action.payload.quantity;
        localStorage.setItem('cartList', JSON.stringify(state.cartList));
      } else {
        state.cartList.push(action.payload);
        localStorage.setItem('cartList', JSON.stringify(state.cartList));
      }
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const index = state.cartList.findIndex((item) => item.id === id);
      if (quantity < 1) {
        state.cartList[index].quantity = 1;
        localStorage.setItem('cartList', JSON.stringify(state.cartList));
      } else {
        state.cartList[index].quantity = quantity;
        localStorage.setItem('cartList', JSON.stringify(state.cartList));
      }
    },

    removeCart: (state, action) => {
      const index = state.cartList.findIndex((item) => item.id === action.payload);
      localStorage.setItem('cartList', JSON.stringify(state.cartList));
      state.cartList.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        localStorage.setItem('token', action.payload.access_token);
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      });
  },
});

export default authSlice.reducer;

export const { logout, addCartList, setQuantity, removeCart, updateProfile } = authSlice.actions;
