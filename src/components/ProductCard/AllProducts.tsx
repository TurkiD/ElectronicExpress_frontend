import SingleProduct from "./ProductCard"
import "./Products.css"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import { Button } from "react-bootstrap"
import Sidebar from "../Sidebars/Sidebar"

const AllProducts = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy])

  console.log(products)

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error{error}</p>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="products-page-container">
        <div className="product-sidebar-container">
          <h2>Category</h2>
          <ul>
            <li>
              <select name="" id="">
                <option value="Smart-Phone">Smart Phone</option>
                <option value="PC">PC</option>
                <option value="Laptop">Laptop</option>
              </select>
            </li>
          </ul>
        </div>
        <div className="right-side-products">
          <section className="card-container">
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <SingleProduct key={product.productID} product={product} />
              ))}
          </section>
        </div>
      </div>
      <div className="btn-container">
        <Button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} onClick={() => setPageNumber(index + 1)}>
            {index + 1}
          </Button>
        ))}
        <Button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </Button>
      </div>
    </>
  )
}

export default AllProducts
