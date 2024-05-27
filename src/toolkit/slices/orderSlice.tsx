import api from "@/api"
import { OrderState } from "@/types/Order"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: OrderState = {
  OrderData: [],
  totalPages: 1,
  order: null,
  error: null,
  isLoading: false
}

export const fetchOrders = createAsyncThunk(
  "/orders/fetchOrders",
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

    const response = await api.get("orders", { params,
        headers: {
          Authorization: `Bearer ${getToken()}`
        } })
    return response.data
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {  
        console.log(action.payload.data);
              
      state.OrderData = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
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

export default orderSlice.reducer
