import AdminCategories from "@/components/Admin/AdminCategories/AdminCategories"
import AdminOrders from "@/components/Admin/AdminOrders/AdminOrders"
import AdminProducts from "@/components/Admin/AdminProducts/AdminProducts"
import AdminUsers from "@/components/Admin/AdminUsers/AdminUsers"
import Navbar from "@/components/Navigation/NavigationBar"
import {
  CartPage,
  DashboardPage,
  HomePage,
  LoginPage,
  ProductDetailsPage,
  ProductsPage,
  ProfilePage,
  RegisterPage
} from "@/pages"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminRoute from "./AdminRoute"
import ProtectedRoute from "./ProtectedRoute"

export const Index = () => {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="/product/:identifier" element={<ProductDetailsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/dashboard/users" element={<AdminUsers />} />
            <Route path="/admin/dashboard/products" element={<AdminProducts />} />
            <Route path="/admin/dashboard/categories" element={<AdminCategories />} />
            <Route path="/admin/dashboard/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default Index
