import { Category } from "@/types/Category"

const SingleCategory = (props: { category: Category }) => {
  const { category } = props
  return (
    <section className="category-card">
      <div className="card-details">
        <h3 className="card-title">{category.name}</h3>
        <section className="card-description">
          <p>{category.description}</p>
        </section>
          <span className="btn-container">
            <button className="card-btn">Edit</button>
            <button className="card-btn">Delete</button>
          </span>
      </div>
    </section>
  )
}

export default SingleCategory
