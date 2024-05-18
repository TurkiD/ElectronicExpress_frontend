import SingleProduct from "./SingleProduct"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import Sidebar from "../layout/sidebars/Sidebar"

const AllProducts = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts())
    }
    fetchData()
  }, [])

  return (
    <>
      <Sidebar />
      <section className="card-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}
        {products &&
          products.length > 0 &&
          products.map((product) => <SingleProduct key={product.productID} product={product} />)}
      </section>
    </>
  )
}

export default AllProducts
