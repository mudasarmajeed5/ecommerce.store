import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
export const CartItemsSlice = createSlice({
  name: 'cartItems',
  initialState:{
    MyCart:[]
  },
  reducers: {
    AddItem: (state, action) => {
      state.MyCart = [...state.MyCart, action.payload];
      toast.success('Product has been added.');
    },
    RemoveItem:(state,action)=>{
      const selectedItemId = action.payload.id;
      const UpdatedCart = state.MyCart.filter(item=>item.id !== selectedItemId);
      state.MyCart = UpdatedCart;
    }
  },
});
export const { AddItem, RemoveItem } = CartItemsSlice.actions
export default CartItemsSlice.reducer