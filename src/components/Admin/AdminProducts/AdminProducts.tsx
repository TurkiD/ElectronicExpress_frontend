import "../layout/table.css"
import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import { useEffect, useState } from "react"
import { AppDispatch } from "@/toolkit/Store"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import useProductState from "@/hooks/useProductState"

import { useDispatch } from "react-redux"
import { Button } from "react-bootstrap"
import SingleProduct from "./SingleProduct"
import CreateProduct from "@/components/Modal/ProductModal/CreateProduct"

const AdminProducts = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")

  const [modalShow, setModalShow] = useState(false)

  const { productData, isLoading, totalPages, error } = useProductState()

  const dispatch: AppDispatch = useDispatch()
  // get product
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 mx-0 px-0">
          <DashboardBar />
        </div>
        <div className="col-10 mx-0 px-0">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error{error}</p>}
          {/* Create product */}
          <CreateProduct show={modalShow} onHide={() => setModalShow(false)} />
          <br />
          {/* Render product */}
          <table>
            <thead>
              <tr>
                <td>
                  {" "}
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
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Product
                  </Button>
                </td>
              </tr>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productData &&
                productData.length > 0 &&
                productData.map((product) => (
                  <SingleProduct
                    key={`${product.productID}-${product.categoryID}`}
                    product={product}
                  />
                ))}
            </tbody>
          </table>
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
      </div>
    </div>
  )
}
export default AdminProducts
