import api from "@/api"
import { CategoryState } from "@/types/Category"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  error: null,
  isLoading: false
}

export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async ({ pageNumber, pageSize, searchTerm, sortBy }: { pageNumber: number; pageSize: number; searchTerm: string; sortBy: string }) => {
    const response = 
    searchTerm.length > 0
    ? await api.get(`categories?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortBy}`)
    : await api.get(`categories?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
    
    return response.data
  }
)

// export const fetchCategoryById = createAsyncThunk(
//   "products/fetchProductById",
//   async (identifier: string | undefined) => {
//     const response = await api.get(`/categories/${identifier}`)
//     return response.data
//   }
// )

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string | undefined) => {
    const token = getToken()
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return categoryId
  }
)

const categorySlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload.data.items
      state.totalPages = action.payload.totalPages
      state.error = null
      state.isLoading = false
    })
    // builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
    //   state.products = action.payload.data
    //   state.error = null
    //   state.isLoading = false
    // })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(category => category.categoryID != action.payload)
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

export default categorySlice.reducer
