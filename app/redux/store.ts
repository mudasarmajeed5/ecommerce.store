import { configureStore } from '@reduxjs/toolkit'
import  CartItemsSliceReducer  from './Cart/CartItems';
export const store = configureStore({
  reducer: {
    CartItem:CartItemsSliceReducer,
  }, 
});
export default store;