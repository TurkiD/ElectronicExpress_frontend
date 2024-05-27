import api from "@/api"
import { LoginFormData, User, UserState } from "@/types/User"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const data =
  localStorage.getItem("loginData") != null
    ? JSON.parse(String(localStorage.getItem("loginData")))
    : []

const initialState: UserState = {
  users: [],
  totalPages: 1,
  error: null,
  isLoading: false,
  userData: data.userData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const fetchUsers = createAsyncThunk(
  "/users/fetchUsers",
  async ({
    pageNumber,
    pageSize,
    searchTerm,
    sortBy
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

    const response = await api.get("/users", {
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post(`/register`, newUser)
  return response.data
})

export const loginUser = createAsyncThunk("users/login", async (userData: LoginFormData) => {
  const response = await api.post(`/login`, userData)
  return response.data
})
// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (productId: string) => {
//     await api.delete(`/products/${productId}`, {
//       headers: {
//         Authorization: `Bearer ${getToken()}`
//       }
//     })
//     return productId
//   }
// )

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    LogoutUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.items
      state.totalPages = action.payload.totalPages
      state.error = null
      state.isLoading = false
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
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

export const { LogoutUser } = userSlice.actions
export default userSlice.reducer
