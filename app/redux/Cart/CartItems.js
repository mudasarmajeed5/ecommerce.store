import { createSlice } from '@reduxjs/toolkit'

export const CartItemsSlice = createSlice({
  name: 'cartItems',
  initialState:{
    MyCart:[]
  },
  reducers: {
    AddItem: (state, action) => {
      state.MyCart = [...state.MyCart, action.payload];
    },
    RemoveItem:(state,action)=>{
      console.log("For now nothing. will add the functionality later.");
    }
  },
});



// Action creators are generated for each case reducer function
export const { AddItem, RemoveItem } = CartItemsSlice.actions

export default CartItemsSlice.reducer