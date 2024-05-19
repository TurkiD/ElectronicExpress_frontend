import api from "@/api"
import { LoginFormData, User, UserState } from "@/types/User"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: UserState = {
  //   users: [],
  //   totalPages: 1,
  user: null,
  error: null,
  isLoading: false
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post(`/register`, newUser)
  return response.data
})

export const loginUser = createAsyncThunk("users/login", async (userData: LoginFormData) => {
  const response = await api.post(`/login`, userData)
  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {}
})

export default userSlice.reducer
