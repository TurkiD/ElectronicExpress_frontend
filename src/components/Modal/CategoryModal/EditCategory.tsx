import { AppDispatch } from "@/toolkit/Store"
import { updateCategory } from "@/toolkit/slices/categorySlice"
import { Category } from "@/types/Category"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

interface PopupProps {
  onHide: () => void
  show: boolean
  category: Category
}

const EditCategory: React.FC<PopupProps> = (props) => {
  const { onHide, category } = props
  const dispatch: AppDispatch = useDispatch()

  const [categoryName, setCategoryName] = useState(category.name)
  const [categoryDescription, setCategoryDescription] = useState(category.description)

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const updateCategoryData = {
      name: categoryName,
      description: categoryDescription
    }

    try {
      const response = await dispatch(
        updateCategory({ categoryId: category.categoryID, updateCategoryData: updateCategoryData })
      );

      if (response.payload.success) {
        toast.success(response.payload.message);
        onHide();
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('An error occurred while updating the product.');
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCategoryDescription(event.target.value)
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              name="name"
              onChange={handleNameChange}
              value={categoryName}
              className="form-control"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Category Description</label>
            <textarea
              name="description"
              onChange={handleDescriptionChange}
              value={categoryDescription}
              className="form-control mw-100"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCategory
