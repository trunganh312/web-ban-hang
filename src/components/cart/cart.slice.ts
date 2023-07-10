import { createSlice } from '@reduxjs/toolkit';

interface CartType {
  cartList: any[];
  loading: boolean;
}

const initialState: CartType = {
  cartList: JSON.parse(localStorage.getItem('cartList') || '[]'),
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartList: (state, action) => {
      const index = state.cartList.findIndex((item) => item.id === action.payload.id);
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
});
//
export default cartSlice.reducer;

export const { addCartList, setQuantity, removeCart } = cartSlice.actions;
