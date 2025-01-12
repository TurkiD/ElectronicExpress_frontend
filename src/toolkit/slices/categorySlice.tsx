import api from "@/api"
import { CategoryState, CreateCategoryFormData, UpdateCategoryFormData } from "@/types/Category"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: CategoryState = {
  categoryData: [],
  totalPages: 1,
  error: null,
  isLoading: false
}

export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async ({
    pageNumber,
    pageSize,
    searchTerm,
    sortBy,
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
  }) => {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      searchTerm,
      sortBy
    })

    const response = await api.get("/categories", { params })
     return response.data
  }
)

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: CreateCategoryFormData) => {
    const response = await api.post(`/categories`, newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data.data
  }
)

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    categoryId,
    updateCategoryData
  }: {
    categoryId: string
    updateCategoryData: UpdateCategoryFormData
  }) => {
    const response = await api.put(`/categories/${categoryId}`, updateCategoryData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
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
      state.categoryData = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.error = null
      state.isLoading = false
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categoryData.push(action.payload)
      state.error = null
      state.isLoading = false
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const foundCategory = state.categoryData.find(
        (category) => category.categoryID === action.payload.data.categoryID
      )
      if (foundCategory) {
        foundCategory.name = action.payload.data.name
        foundCategory.description = action.payload.data.description
        state.error = null
        state.isLoading = false
      }
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categoryData = state.categoryData.filter(
        (category) => category.categoryID != action.payload
      )
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
