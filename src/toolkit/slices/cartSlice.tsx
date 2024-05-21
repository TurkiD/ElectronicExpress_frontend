import api from "@/api"
import { CartState } from "@/types/Cart"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: CartState = {
  carts: [],
  cart: null,
  error: null,
  isLoading: false
}

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (identifier: string | undefined) => {
    const token = getToken()
    const response = await api.post(`/cart/${identifier}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
)

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const token = getToken()
    const response = await api.get(`/cart`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    
    return response.data
  }
)


const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(addProductToCart.fulfilled, (state) => {
      state.error = null
      state.isLoading = false
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.carts = action.payload.data["0"].products
      state.error = null
      state.isLoading = false
    })
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default cartSlice.reducer
