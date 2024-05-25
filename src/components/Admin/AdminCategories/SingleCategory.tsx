import EditCategory from "@/components/Modal/CategoryModal/EditCategory"
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
  const [modalShow, setModalShow] = useState(false)

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
      <tr key={categoryID}>
        <td>{name}</td>
        <td>{description}</td>
        <td>
          <button className="card-btn" onClick={() => setModalShow(true)}>
            Edit
          </button>
          <EditCategory show={modalShow} onHide={() => setModalShow(false)} category={category} />
          <button
            className="card-btn"
            onClick={() => {
              handleDelete(categoryID)
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default SingleCategory
