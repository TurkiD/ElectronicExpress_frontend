import api from "@/api"
import { ProductState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await api.get(`/products`)  
  return response.data
})

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
      state.products = action.payload.data.items
      state.error = null
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
  }
})

export default productSlice.reducer