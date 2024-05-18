import Navbar from "@/components/layout/navigation/Navigationbar"
import Products from "@/pages/Products"
import Dashboard from "@/pages/Dashboard"

import { Home } from "@/pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProductDetails } from "@/pages/ProductDetails"

export const Index = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="/product/:identifier" element={<ProductDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default Index
