import api from "@/api"
import { ProductState } from "@/types/Product"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  products: [],
  product: null,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await api.get(`/products`)
  return response.data
})

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (identifier: string | undefined) => {
    const response = await api.get(`/products/${identifier}`)
    return response.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.items.$values
      state.error = null
      state.isLoading = false
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product = action.payload.data
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

export default productSlice.reducer
