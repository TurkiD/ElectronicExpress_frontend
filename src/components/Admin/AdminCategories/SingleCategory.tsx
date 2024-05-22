import { AppDispatch } from "@/toolkit/Store";
import { deleteCategory } from "@/toolkit/slices/categorySlice";
import { Category } from "@/types/Category"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SingleCategory = (props: { category: Category }) => {
  const { category } = props
  
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (categoryId: string) => {
    const response = await dispatch(deleteCategory(categoryId));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Category Deleted")
    } else {
      toast.error(response.meta.requestStatus)
    }
  };

  return (
    <section className="category-card">
      <div className="card-details">
        <h3 className="card-title">{category.name}</h3>
        <section className="card-description">
          <p>{category.description}</p>
        </section>
          <span className="btn-container">
            <button className="card-btn">Edit</button>
            <button className="card-btn" onClick={() =>{ handleDelete(category.categoryID)}}>Delete</button>
          </span>
      </div>
    </section>
  )
}

export default SingleCategory
