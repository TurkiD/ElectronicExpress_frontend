import SingleProduct from "./ProductCard"
import "./Products.css"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import { Button } from "react-bootstrap"
import useProductState from "@/hooks/useProductState"

const AllProducts = () => {
  const { productData, isLoading, error, totalPages } = useProductState()

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
      {error && <p>{error}</p>}
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
              <select name="category">
                <option value="Smart-Phone">Smart Phone</option>
                <option value="PC">PC</option>
                <option value="Laptop">Laptop</option>
              </select>
            </li>
          </ul>
        </div>
        <div className="right-side-products">
          <section className="card-container">
            {productData &&
              productData.length > 0 &&
              productData.map((product) => (
                <SingleProduct key={product.productID} product={product} />
              ))}
          </section>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className={`page-link btn ${
                pageNumber === 1 ? "btn-outline-secondary disabled" : "btn-dark text-secondary"
              }`}
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li className="page-item" key={index}>
              <button
                className={` btn ${
                  index + 1 === pageNumber ? "btn-dark" : "d-inline-flex focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
                }`}
                onClick={() => setPageNumber(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className={`page-link btn ${
                pageNumber === totalPages ? "btn-outline-secondary disabled" : "btn-dark text-secondary"
              }`}
              onClick={handleNextPage}
              disabled={pageNumber === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default AllProducts
