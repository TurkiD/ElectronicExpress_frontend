import "./Category.css"
import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { createCategory, fetchCategory } from "@/toolkit/slices/categorySlice"
import SingleCategory from "./SingleCategory"
import { CreateCategoryFormData } from "@/types/Category"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

const AdminCategories = () => {
  const { categories, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.categoryR
  )

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [popupVisible, setPopupVisible] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCategoryFormData>()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategory({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy])

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    try {
      dispatch(createCategory(data))
    } catch (error: any) {
      toast.error(error.message)
    }
  }

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

  function togglePopup() {
    setPopupVisible(!popupVisible)
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
          {popupVisible && (
            <form className="text-center pt-3" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="text-center"
                type="text"
                placeholder="Category Name"
                {...register("name", {
                  required: "Name is Required",
                  minLength: { value: 2, message: "Name must be at least 2 character" }
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
              <section className="card-description">
                <textarea
                  placeholder="Category Description"
                  className="text-center mt-2 pt-2 resize-none"
                  {...register("description")}
                ></textarea>
                {errors.description && <p>{errors.description.message}</p>}
              </section>
              <span className="btn-container">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </span>
            </form>
          )}
          <span className="btn-container">
            <button type="submit" className="btn btn-primary mt-3" onClick={togglePopup}>
              {popupVisible ? "Cancel" : "Create Category"}
            </button>
          </span>

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
