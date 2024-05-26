import useCategoryState from "@/hooks/useCategoryState"
import { AppDispatch } from "@/toolkit/Store"
import { fetchCategory } from "@/toolkit/slices/categorySlice"
import { createProduct } from "@/toolkit/slices/productSlice"
import { CreateProductForm } from "@/types/Product"
import { uploadImageToCloudinary } from "@/utils/cloudinary"

import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

interface PopupProps {
  onHide: () => void
  show: boolean
}

const CreateProduct: React.FC<PopupProps> = (props) => {
  const { onHide } = props
  const dispatch: AppDispatch = useDispatch()
  const { categoryData } = useCategoryState()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateProductForm>()

  const [pageNumber] = useState(1)
  const [pageSize] = useState(8)
  const [searchTerm] = useState("")
  const [sortBy] = useState("Name")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // get category
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategory({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [])

  const onSubmit: SubmitHandler<CreateProductForm> = async (data) => {
    try {
      let imageUrl = ""
      if (data.image && data.image.length > 0) {
        const file = data.image[0]
        try {
          // upload image to the cloudinary
          imageUrl = await uploadImageToCloudinary(file)
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error)
          toast.error("Error uploading image. Please try again.")
          return
        }
      }

      const productData = {
        ...data,
        image: imageUrl
      }

      const response = await dispatch(createProduct(productData))

      if (response.meta.requestStatus === "fulfilled") {
        toast.success(response.payload.message)
        onHide()
      } else {
        toast.error(response.payload?.message || "Product creation failed")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error("An unexpected error occurred. Please try again later.")
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input type="text" {...register("productName")} required className="form-control" />
            {errors.productName && <p>{errors.productName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <textarea
              {...register("description")}
              required
              className="form-control mw-100"
            ></textarea>
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" min="1" {...register("quantity")} className="form-control" />
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("price")}
              className="form-control"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <Controller
            name="categoryID"
            control={control}
            render={({ field }) => (
              <select {...field} className="form-control mt-4">
                <option>Select Category</option>
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
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              required
              className="form-control-file mt-4"
            />
            {errors.image && <p>{errors.image.message}</p>}
            {imagePreview && (
              <img src={imagePreview} alt="Image preview" className="image-preview" />
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-5">
            Create
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateProduct
