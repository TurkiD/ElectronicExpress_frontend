import { Home } from "@/pages/Home/Home"
import { ProductDetails } from "@/pages/ProductDetails/ProductDetails"
import Navbar from "@/components/Navigation/Navigationbar"
import Products from "@/pages/Products"
import Dashboard from "@/pages/Dashboard/Dashboard"

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default Index
