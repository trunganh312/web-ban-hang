import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productSlice from './components/product/product.slice';
import categorySlice from './components/category/category.slice';
import cartSlice from './components/cart/cart.slice';
import authSlice from './components/auth/auth.slice';
// ...

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
    cart: cartSlice,
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
