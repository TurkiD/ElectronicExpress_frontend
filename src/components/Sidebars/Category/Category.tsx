import "./Category.css"

const Category = () => {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>
      <div className="category-container">
        <label className="sidebar-label-container">
          <input type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <select name="" id="">
          <option value="Smart-Phone">Smart Phone</option>
          <option value="PC">PC</option>
          <option value="Laptop">Laptop</option>
        </select>
        {/* <input value="value here" title="title here" name="test" /> */}
      </div>
    </div>
  )
}

export default Category
