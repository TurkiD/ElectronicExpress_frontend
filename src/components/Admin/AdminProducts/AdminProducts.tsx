import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import "./Product.css"
import { useEffect, useState } from "react"
import { AppDispatch } from "@/toolkit/Store"
import { useDispatch } from "react-redux"
import { Button } from "react-bootstrap"
import { createProduct, deleteProduct, fetchProducts } from "@/toolkit/slices/productSlice"
import { CreateProductFormData, Product } from "@/types/Product"
import { toast } from "react-toastify"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { uploadImageToCloudinary } from "@/utils/cloudinary"
import useCategoryState from "@/hooks/useCategoryState"
import useProductState from "@/hooks/useProductState"
import { fetchCategory } from "@/toolkit/slices/categorySlice"

const AdminProducts = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")

  const [popupVisible, setPopupVisible] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<CreateProductFormData>()

  const { categoryData } = useCategoryState()
  const { productData, isLoading, totalPages, error } = useProductState()

  const dispatch: AppDispatch = useDispatch()
  // get product
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy])

  // get category
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategory({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [])

  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      let imageUrl = ""
      if (data.image && data.image.length > 0) {
        const file = data.image[0]
        // upload image to the cloudinary
        imageUrl = await uploadImageToCloudinary(file)
      }
      const productData = {
        ...data,
        image: imageUrl
      }

      console.log(productData)

      const response = await dispatch(createProduct(productData))
      // toast.success(response.payload.message)
    } catch (error) {
      toast.error("Product creation failed")
    }
  }

  // handle product edit
  const handleEdit = async (id: string, product: Product) => {
    setPopupVisible(!popupVisible)

    if (popupVisible == false) {
      setProductName(product.productName)
      setProductDescription(product.description)
    }
  }

  const handleDelete = async (productId: string) => {
    const response = await dispatch(deleteProduct(productId))
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Product Deleted")
    } else {
      toast.error(response.meta.requestStatus)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 mx-0 px-0">
          <DashboardBar />
        </div>
        <div className="col-10 mx-0 px-0">
          <h1>Products</h1>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="productName">Product Name</label>
            <input type="text" {...register("productName")} required />
            {errors.productName && <p>{errors.productName.message}</p>}
            <textarea {...register("description")} required></textarea>
            {errors.description && <p>{errors.description.message}</p>}
            <label htmlFor="quantity">Quantity</label>
            <input type="number" min="1" {...register("quantity")} />
            {errors.quantity && <p>{errors.quantity.message}</p>}
            <input type="number" step="0.01" min="0" {...register("price")} />
            {errors.price && <p>{errors.price.message}</p>}
            <label htmlFor="categoryId">Select Category</label>
            <Controller
              name="categoryID"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  {categoryData &&
                    categoryData.length > 0 &&
                    categoryData.map((category) => (
                      <option key={category.categoryID} value={category.categoryID}>
                        {category.name}
                      </option>
                    ))}
                </select>
              )}
            />
            {errors.categoryID && <p>{errors.categoryID.message}</p>}
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              required
            />
            {errors.image && <p>{errors.image.message}</p>}
            {imagePreview && <img src={imagePreview} alt="Image preview" />}
            <button type="submit">Create</button>
          </form>
          <br />
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
              {productData &&
                productData.length > 0 &&
                productData.map((product) => (
                  <tr key={`${product.productID}-${product.categoryID}`}>
                    <td>
                      <img src={product.image} alt={product.productName} className="table-img" />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.category.name}</td>
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
