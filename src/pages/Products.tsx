import PageTitle from "@/components/PageTitle"
import AllProducts from "@/components/ProductCard/AllProducts"
import Sidebar from "../components/Sidebars/Sidebar"

const Products = () => {
  return (
    <>
        <PageTitle title="Products" />
          <Sidebar />
          <AllProducts />
    </>
  )
}

export default Products
