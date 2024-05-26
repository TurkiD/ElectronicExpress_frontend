import api from "@/api"
import {
  CreateProductForBackend,
  CreateProductFormData,
  Product,
  ProductState,
  UpdateProductFormData
} from "@/types/Product"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  productData: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    searchTerm,
    sortBy,
    selectedCategories,
    minPrice,
    maxPrice
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
    selectedCategories: string[]
    minPrice?: number
    maxPrice?: number
  }) => {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      searchTerm,
      sortBy,
    })

    selectedCategories.forEach((categoryId) => {      
      params.append("selectedCategories", categoryId)
    })
    
    if (minPrice !== undefined) {
      params.append("MinPrice", minPrice.toString())
    }
    if (maxPrice !== undefined) {
      params.append("MaxPrice", maxPrice.toString())
    }

    const response = await api.get("/products", {params})
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

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: CreateProductForBackend) => {    
    const response = await api.post("/products", newProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    productId,
    updateProductData
  }: {
    productId: string
    updateProductData: UpdateProductFormData
  }) => {
    const response = await api.put(`/products/${productId}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return productId
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productData = action.payload.items
      state.totalPages = action.payload.totalPages
      state.error = null
      state.isLoading = false
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product = action.payload.data
      state.error = null
      state.isLoading = false
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {      
      state.productData.push(action.payload.data)
      state.error = null
      state.isLoading = false
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const foundProduct = state.productData.find(
        (product) => product.productID === action.payload.data.productID
      )
      if (foundProduct) {
        foundProduct.productName = action.payload.data.productName
        foundProduct.description = action.payload.data.description
        state.error = null
        state.isLoading = false
      }
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.productData = state.productData.filter((product) => product.productID != action.payload)
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
