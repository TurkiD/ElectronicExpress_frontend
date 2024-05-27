import "../layout/table.css"
import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import { useEffect, useState } from "react"
import { AppDispatch } from "@/toolkit/Store"

import { useDispatch } from "react-redux"
import useOrderState from "@/hooks/useOrderState"
import { fetchOrders } from "@/toolkit/slices/orderSlice"
import SingleOrder from "./SingleOrder"

const AdminUser = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")


  const { OrderData, isLoading, totalPages, error } = useOrderState()

  const dispatch: AppDispatch = useDispatch()
  // get users
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrders({ pageNumber, pageSize, searchTerm, sortBy }))
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
          {error && <p>{error}</p>}
          <br />
          {/* Render users */}
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
                    <option value="date">Date</option>
                  </select>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>Order ID</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {OrderData &&
                OrderData.length > 0 &&
                OrderData.map((order) => (
                  <SingleOrder
                    key={order.orderId}
                    order={order}
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
export default AdminUser
