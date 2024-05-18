import Category from "./Category/Category"
import "./Sidebar.css"
import Colors from "./colors/Colors"

const Sidebar = () => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category />
        <Colors />
      </section>
    </>
  )
}

export default Sidebar
