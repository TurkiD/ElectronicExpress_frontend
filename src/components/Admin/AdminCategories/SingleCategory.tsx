import { AppDispatch } from "@/toolkit/Store"
import { deleteCategory, updateCategory } from "@/toolkit/slices/categorySlice"
import { Category } from "@/types/Category"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const SingleCategory = (props: { category: Category }) => {
  const { category } = props
  const { categoryID, name, description } = category
  const dispatch: AppDispatch = useDispatch()

  const [categoryName, setCategoryName] = useState(name)
  const [categoryDescription, setCategoryDescription] = useState(description)
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [popupVisible, setPopupVisible] = useState<boolean>(false)

  const handleEdit = async (id: string, category: Category) => {
    setPopupVisible(!popupVisible)

    if (popupVisible == false) {
      setSelectedCategoryId(id)
      setCategoryName(category.name)
      setCategoryDescription(category.description)
    }
  }

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updateCategoryData = {
      name: categoryName,
      description: categoryDescription
    }
    dispatch(updateCategory({categoryId: selectedCategoryId, updateCategoryData: updateCategoryData}))
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCategoryDescription(event.target.value)
  }

  const handleDelete = async (categoryId: string) => {
    const response = await dispatch(deleteCategory(categoryId))
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Category Deleted")
    } else {
      toast.error(response.meta.requestStatus)
    }
  }

  return (
    <>
      <section className="category-card">
        <div className="card-details">
          <form onSubmit={handleEditSubmit}>
            <input
              name="name"
              type="text"
              className="text-center border-0 fs-3"
              // value={categoryName}
              defaultValue={categoryName}
              onChange={handleNameChange}
              readOnly={!popupVisible}
              required
              // onChange={handleNameChange}
            />
            <section className="card-description">
              <textarea
                name="categoryDescription"
                className="border-0 text-center mt-2 pt-2 resize-none"
                // value={description}
                defaultValue={categoryDescription}
                onChange={handleDescriptionChange}
                readOnly={!popupVisible}
                required
              ></textarea>
            </section>
            <span className="btn-container">
              {popupVisible && (
                <button type="submit" className="card-btn">
                  Save
                </button>
              )}
            </span>
          </form>
          <span className="btn-container">
            <button
              className="card-btn"
              onClick={() => {
                handleEdit(categoryID, category)
              }}
            >
              {popupVisible ? "Cancel" : "Edit"}
            </button>
            <button
              className="card-btn"
              onClick={() => {
                handleDelete(category.categoryID)
              }}
            >
              Delete
            </button>
          </span>
        </div>
      </section>
    </>
  )
}

export default SingleCategory
