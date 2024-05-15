// import { Product } from "@/pages/Product"
import { Home } from "@/pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "@/components/layout/navigation/Navigationbar"
import Dashboard from "@/pages/Dashboard"
import Products from "@/components/products/Products"

export const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
