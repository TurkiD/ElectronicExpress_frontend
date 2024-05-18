import api from "@/api"
import { ProductState } from "@/types/Product"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ pageNumber, pageSize, searchTerm, sortBy }: { pageNumber: number; pageSize: number; searchTerm: string; sortBy: string }) => {
    const response = 
    searchTerm.length > 0
    ? await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortBy}`)
    : await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
    return response.data
  }
)

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
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.items.$values
      state.totalPages = action.payload.totalPages
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
