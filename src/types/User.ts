// User
export type User = {
  username: string
  email: string
  password: string
  image?: string
  isAdmin?: boolean
  isBanned?: boolean
  createdAt?: string
}

export type UserState = {
  // users: User[],
  // totalPages: number,
  isLoading: boolean
  error: null | string
  userData: User | null
  token: string | null
  isLoggedIn: boolean
}

export type RegisterFormData = {
  username: string
  email: string
  password: string
  image: string
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginData = {
  userData: string | null
  isLoggedIn: boolean
  token: string
}

export type updateUserProfile = {
  username: string
  email: string
  password: string
  image: string
}