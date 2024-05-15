export type Product = {
  $id: string;
  productID: string;
  productName: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  categoryID: string;
}

export type ProductState = {
  products: Product[],
  error: null | string
  isLoading: boolean
}