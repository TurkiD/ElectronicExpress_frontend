import PageTitle from "@/components/PageTitle"
import AllProducts from "@/components/ProductCard/AllProducts"
import "./ProductsPage.css"
import Navigationbar from "@/components/Navigation/Navigationbar"

export const ProductsPage = () => {
  return (
    <>
      <PageTitle title="Products" />
      <Navigationbar />
      <AllProducts />
    </>
  )
}
