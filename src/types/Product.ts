import { Category } from "./Category";

export type CustomeError = {
  message: string
}

export type Product = {
  productID: string;
  productName: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  createdAt: string;
  categoryID: string;
  category: Category
}

export type ProductState = {
  productData: Product[],
  totalPages: number,
  product: Product | null,
  error: null | string
  isLoading: boolean
}

export type UpdateProductFormData  = {
  productName: string;
  description: string;
  // image?: string;
  // quantity?: number;
  // price?: number;
  // categoryID?: string;
  // createdAt: string;
}

export type CreateProductForBackend  = {
  productName: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  categoryID?: string;
}

export type CreateProductFormData  = {
  productName: string;
  description: string;
  quantity: number;
  price: number;
  image: FileList;
  categoryID?: string;
}