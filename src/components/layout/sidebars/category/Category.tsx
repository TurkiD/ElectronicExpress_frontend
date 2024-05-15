import "./Category.css"

const Category = () => {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>
      <div>
        <label className="sidebar-label-container">
          <input type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <input value="value here" title="title here" name="test" />
        <input value="value here" title="title here" name="test" />
        <input value="value here" title="title here" name="test" />
        <input value="value here" title="title here" name="test" />
      </div>
    </div>
  )
}

export default Category
