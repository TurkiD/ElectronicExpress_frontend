export type Category = {
  categoryID: string
  name: string
  description: string
  createdAt: number
  products: Product[]
}

export type CategoryState = {
  categories: Category[]
  totalPages: number
  error: null | string
  isLoading: boolean
}

export type Product = {
  productID: string
  productName: string
  description: string
  image: string
  quantity: number
  price: number
  // createdAt: string;
  categoryID: string
}
