import PageTitle from "@/components/PageTitle"
import AllProducts from "@/components/ProductCard/AllProducts"
import "./Products.css"

export const Products = () => {
  return (
    <>
      <PageTitle title="Products" />
      <AllProducts />
    </>
  )
}
