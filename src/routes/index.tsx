import Navbar from "@/components/Navigation/Navigationbar"
import { Dashboard, Home, Login, ProductDetails, Products, Register } from "@/pages"

import { BrowserRouter, Route, Routes } from "react-router-dom"

export const Index = () => {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="/product/:identifier" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default Index
