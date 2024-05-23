export type Product = {
  productID: string;
  productName: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  // createdAt: string;
  categoryID: string;
}

export type ProductState = {
  products: Product[],
  totalPages: number,
  product: Product | null,
  error: null | string
  isLoading: boolean
}

export type UpdateProductFormData  = {
  productID: string;
  productName: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  // createdAt: string;
  // categoryID: string;
}