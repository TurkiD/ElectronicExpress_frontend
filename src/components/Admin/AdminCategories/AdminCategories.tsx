import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchCategory } from "@/toolkit/slices/categorySlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SingleCategory from "./SingleCategory"
import { Button } from "react-bootstrap"
import "./Category.css"

const AdminCategories = () => {
  const { categories, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.categoryR
  )

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")

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
        <div className=" col-10 mx-0 px-0">
          <h1 className="text-center pb-1">Categories</h1>
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
              <option value="date">Date</option>
            </select>
          </div>
          <section className="card-container ms-5">
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <SingleCategory key={category.categoryID} category={category} />
              ))}
          </section>
        </div>
      </div>
      <div className="btn-container pb-3">
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
    </div>
  )
}

export default AdminCategories
