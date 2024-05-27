import { Product } from "./Product"

export type CustomError = {
  message: string
}

export type Order = {
  orderId: string
  status: string
  payment: string
  amount: number
  product: Product[]
}

export type OrderState = {
  OrderData: Order[]
  totalPages: number
  order: Order | null
  error: null | string
  isLoading: boolean
}
