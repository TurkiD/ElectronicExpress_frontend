import { AppDispatch } from "@/toolkit/Store"
import { deleteCategory} from "@/toolkit/slices/categorySlice"
import { Category, UpdateCategoryFormData } from "@/types/Category"

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const SingleCategory = (props: { category: Category }) => {
  const { category } = props
  const dispatch: AppDispatch = useDispatch()

  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateCategoryFormData>()

  const onSubmit: SubmitHandler<UpdateCategoryFormData> = async (data) => {
    try {
      // dispatch(updateCategory(category.categoryID, data))
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (categoryId: string) => {
    const response = await dispatch(deleteCategory(categoryId))
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Category Deleted")
    } else {
      toast.error(response.meta.requestStatus)
    }
  }

  function togglePopup() {
    setPopupVisible(!popupVisible)
    console.log(popupVisible)
  }

  return (
    <>
      <section className="category-card">
        <div className="card-details">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="text-center border-0 fs-3"
              type="text"
              defaultValue={category.name}
              readOnly={!popupVisible}
              {...register("name", {
                required: "Name is Required",
                minLength: { value: 2, message: "Name must be at least 2 character" }
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <section className="card-description">
              <textarea
                className="border-0 text-center mt-2 pt-2 resize-none"
                defaultValue={category.description}
                {...register("description")}
                readOnly={!popupVisible}
              ></textarea>
              {errors.description && <p>{errors.description.message}</p>}
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
            <button className="card-btn" onClick={togglePopup}>
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
