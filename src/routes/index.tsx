import Navbar from "@/components/Navigation/NavigationBar"
import { DashboardPage, HomePage, LoginPage, ProductDetailsPage, ProductsPage, RegisterPage } from "@/pages"

import { BrowserRouter, Route, Routes } from "react-router-dom"

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
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default Index
