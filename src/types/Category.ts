export type Category = {
  categoryID: string
  name: string
  description: string
  createdAt: number
  products: Product[]
}

export type CreateCategoryFormData = {
  name: string
  description: string
  products?: Product[]
}

export type CategoryState = {
  categoryData: Category[]
  totalPages: number
  error: null | string
  isLoading: boolean
}

export type UpdateCategoryFormData = {
  name: string
  description: string
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
