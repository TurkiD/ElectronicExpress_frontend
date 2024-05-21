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
    const response = await api.post(
      `/cart/${identifier}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  }
)

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (productId: string | undefined) => {
    const token = getToken()
    await api.delete(`/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return productId
  }
)

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = getToken()
  const response = await api.get(`/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
})

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.carts = action.payload.data["0"].products
      state.error = null
      state.isLoading = false
    })
    builder.addCase(addProductToCart.fulfilled, (state) => {
      state.error = null
      state.isLoading = false
    })
    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      state.carts = state.carts.filter(cart => cart.productID != action.payload)
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
