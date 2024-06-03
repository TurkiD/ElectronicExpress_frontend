import SingleProduct from "./ProductCard"
import "./Products.css"

import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/Store"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import useProductState from "@/hooks/useProductState"
import useCategoryState from "@/hooks/useCategoryState"
import { fetchCategory } from "@/toolkit/slices/categorySlice"

const AllProducts = () => {
  const { productData, isLoading, error, totalPages } = useProductState()
  const { categoryData } = useCategoryState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")

  const [sortBy, setSortBy] = useState("Name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({ pageNumber, pageSize, searchTerm, sortBy, selectedCategories, minPrice, maxPrice})
      )
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy, selectedCategories, minPrice, maxPrice])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategory({ pageNumber, pageSize: 20, searchTerm, sortBy }))
    }
    fetchData()
  }, [])

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
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value))
  }
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value))
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((preSelected) =>
      preSelected.includes(categoryId)
        ? preSelected.filter((id) => id !== categoryId)
        : [...preSelected, categoryId]
    )
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* Searching and Sorting here */}
      <div className="search-container pt-5">
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleSortChange}>
          <option>Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
        </select>
      </div>
      {/* Rendering and Filtering here */}
      <div className="products-page-container">
        <div className="product-sidebar-container ">
          <h2>Filter by category</h2>
          <ul>
            <li>
              {categoryData &&
                categoryData.length > 0 &&
                categoryData.map((category) => (
                  <div className="form-check" key={category.categoryID}>
                    <label className="form-check-label" htmlFor="category">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={category.categoryID}
                        checked={selectedCategories.includes(category.categoryID)}
                        onChange={() => handleCategoryChange(category.categoryID)}
                      />
                      {category.name}
                    </label>
                  </div>
                ))}
            </li>
          </ul>
          <h2>Filter by price</h2>
          <div className="mt-1">
            <label htmlFor="min-price">
              <input
                type="text"
                name="min-price"
                id="min-price"
                placeholder="Min price"
                onChange={handleMinPriceChange}
              />
            </label>
          </div>
          <div className="mt-2">
            <label htmlFor="max-price">
              <input
                type="text"
                name="max-price"
                id="max-price"
                placeholder="Max price"
                onChange={handleMaxPriceChange}
              />
            </label>
          </div>
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
                  index + 1 === pageNumber
                    ? "btn-dark"
                    : "d-inline-flex focus-ring focus-ring-info py-1 px-2 text-decoration-none border rounded-2"
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
                pageNumber === totalPages
                  ? "btn-outline-secondary disabled"
                  : "btn-dark text-secondary"
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
