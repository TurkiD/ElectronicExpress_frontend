import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import "./Product.css"
import { useEffect, useState } from "react"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import { Product } from "@/types/Product"
import { toast } from "react-toastify"

const AdminProducts = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [popupVisible, setPopupVisible] = useState<boolean>(false)

  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )

  const handleEdit = async (id: string, product: Product) => {
    setPopupVisible(!popupVisible)

    if (popupVisible == false) {
      setSelectedCategoryId(id)
      setCategoryName(product.productName)
      setCategoryDescription(product.description)
    }
  }

  const dispatch: AppDispatch = useDispatch()

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
  const handleDelete = async (productId: string) => {
    // const response = await dispatch(deleteCategory(categoryId))
    // if (response.meta.requestStatus === "fulfilled") {
    //   toast.success("Product Deleted")
    // } else {
    //   toast.error(response.meta.requestStatus)
    // }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 mx-0 px-0">
          <DashboardBar />
        </div>
        <div className="col-10 mx-0 px-0">
          <h1>Products</h1>
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
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <tr key={product.productID}>
                    <td>
                      <img src={product.image} alt={product.productName} className="table-img" />
                    </td>
                    <td>{product.productName}</td>
                    <td>Category</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button
                        className="card-btn"
                        onClick={() => {
                          handleEdit(product.categoryID, product)
                        }}
                      >
                        {popupVisible ? "Cancel" : "Edit"}
                      </button>
                      {popupVisible && (
                        <button type="submit" className="card-btn">
                          Save
                        </button>
                      )}
                      <button
                        className="card-btn"
                        onClick={() => {
                          handleDelete(product.productID)
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="btn-container p-3">
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
    </div>
  )
}

export default AdminProducts
