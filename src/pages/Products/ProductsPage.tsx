import PageTitle from "@/components/PageTitle"
import AllProducts from "@/components/ProductCard/AllProducts"
import "./ProductsPage.css"

export const ProductsPage = () => {
  return (
    <>
      <PageTitle title="Products" />
      
      <AllProducts />
    </>
  )
}
