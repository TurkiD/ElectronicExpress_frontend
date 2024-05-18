import PageTitle from "@/components/PageTitle"
import AllProducts from "@/components/ProductCard/AllProducts"
import Sidebar from "../components/Sidebars/Sidebar"

const Products = () => {
  return (
    <div>
      <div className="container">
        <PageTitle title="Products" />
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-container">
          <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default Products
