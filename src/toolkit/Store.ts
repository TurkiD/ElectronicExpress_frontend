import { configureStore } from "@reduxjs/toolkit"

import productReducer from "./slices/productSlice"
import userReducer from "./slices/userSlice"
import cartReducer from "./slices/cartSlice"
import categoryReducer from "./slices/categorySlice"
import orderReducer from "./slices/orderSlice"

export const store = configureStore({
  reducer: {
    productR: productReducer,
    userR: userReducer,
    cartR: cartReducer,
    categoryR: categoryReducer,
    orderR: orderReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
