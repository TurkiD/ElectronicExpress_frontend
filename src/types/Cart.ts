export type Cart = {
  productID: string
  productName: string
  description: string
  image: string
  quantity: number
  price: number
}

export type CartState = {
  carts: Cart[]
  cart: Cart | null
  error: null | string
  isLoading: boolean
}