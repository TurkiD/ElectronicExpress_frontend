import PageTitle from "@/components/PageTitle"
import AllProducts from "@/components/products/AllProducts"
import  Sidebar  from "../components/layout/sidebars/Sidebar"

const Products = () => {
  return (
    <>
      <PageTitle title="Products" />
      {/* <Sidebar /> */}
      <AllProducts />
    </>
  )
}

export default Products
