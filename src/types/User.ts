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
  user: User | null,
  error: null | string
  isLoading: boolean
}

export type LoginFormData = {
    email: string
    password: string
  }
