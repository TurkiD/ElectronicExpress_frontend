import Navbar from "@/components/layout/navigation/Navigationbar" 

import Dashboard from "@/pages/Dashboard"
import { Home } from "@/pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProductDetails } from "@/pages/ProductDetails"
import Products from "@/pages/Products"

export const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="/product/:identifier" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default Index
