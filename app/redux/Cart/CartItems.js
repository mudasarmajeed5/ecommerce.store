import { createSlice } from '@reduxjs/toolkit'

export const CartItemsSlice = createSlice({
  name: 'cartItems',
  initialState:{
    MyCart:
    [
      {
        id:"50ac3fd0-ac04-4b5b-b23d-9ee546427f23",
        image:"https://c8.alamy.com/comp/2BCAYCE/vector-foundation-concealer-serum-metallic-pearlised-pink-tube-in-pink-background-2BCAYCE.jpg",
        price:310,
        tag:"Foundation",
        title:"Mascara"
      },
      {
        id:"50ac3fd0-ac04-4b5b-b23d-9ee546427f23",
        image:"https://i5.walmartimages.com/seo/MISS-ROSE-All-In-One-Makeup-Kit-Makeup-Kit-for-Women-Full-Kit-Multipurpose-Women-s-Makeup-Sets-Beginners-and-Professionals-Alike-Easy-to-Carry_2794f783-b09c-4be3-864a-1a55f63f2cd7.9a4f5e737a923074356262e5938fa36c.jpeg",
        price:295,
        tag:"Foundation",
        title:"LipStick"
      },
      {
        id:"50ac3fd0-ac04-4b5b-b23d-9ee546427f23",
        image:'https://www.myglow.pk/cdn/shop/files/sl-basics-by-shaista-lodhi-health-beauty-personal-care-cosmetics-skin-care-facial-cleansers-sl-basics-no-makeup-makeup-kit-pink-undertone-39619935043841_1200x.jpg?v=1712403013',
        price:600,
        tag:"Foundation",
        title:"MakeupKit"
      }
    ]
  },
  reducers: {
    AddItem: (state, action) => {
      state.MyCart = [...state.MyCart, action.payload];
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