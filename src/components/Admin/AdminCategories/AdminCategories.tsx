import "../layout/table.css"
import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import { AppDispatch } from "@/toolkit/Store"
import { fetchCategory } from "@/toolkit/slices/categorySlice"
import SingleCategory from "./SingleCategory"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "react-bootstrap"
import useCategoryState from "@/hooks/useCategoryState"
import CreateCategory from "@/components/Modal/CategoryModal/CreateCategory"

const AdminCategories = () => {
  const { categoryData, isLoading, error, totalPages } = useCategoryState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategory({ pageNumber, pageSize, searchTerm, sortBy }))
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
          <CreateCategory show={modalShow} onHide={() => setModalShow(false)} />
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
                <td>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Product
                  </Button>
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryData &&
                categoryData.length > 0 &&
                categoryData.map((category) => (
                  <SingleCategory
                    key={category.categoryID}
                    category={category}
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

export default AdminCategories
