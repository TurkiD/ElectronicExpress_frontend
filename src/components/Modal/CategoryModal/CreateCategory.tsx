import useCategoryState from "@/hooks/useCategoryState"
import { AppDispatch } from "@/toolkit/Store"
import { createCategory } from "@/toolkit/slices/categorySlice"
import { CreateCategoryFormData, Product } from "@/types/Category"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

interface PopupProps {
  onHide: () => void
  show: boolean
}

const CreateCategory: React.FC<PopupProps> = (props) => {
  const { onHide } = props
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCategoryFormData>()

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    try {
      const response = await dispatch(createCategory(data))

      if (response.meta.requestStatus === "fulfilled") {
        toast.success(response.payload.message)
        onHide()
      } else {
        toast.error(response.payload?.message || "Category creation failed")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error("An unexpected error occurred. Please try again later.")
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
            <label htmlFor="name"> Category Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
                minLength: { value: 2, message: "Name must be at least 2 character" }
              })}
              className="form-control"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Category Description</label>
            <textarea className="form-control mw-100" {...register("description")}></textarea>
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary mt-3">
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

export default CreateCategory
