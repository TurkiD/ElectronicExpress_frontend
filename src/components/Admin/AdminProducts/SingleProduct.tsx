import EditProduct from "@/components/Modal/EditProduct"
import { AppDispatch } from "@/toolkit/Store"
import { deleteProduct } from "@/toolkit/slices/productSlice"
import { Product } from "@/types/Product"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props
  const dispatch: AppDispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)

  const handleDelete = async (productId: string) => {
    try {
      const response = await dispatch(deleteProduct(productId))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Product Deleted")
      } else {
        toast.error("An error occurred while deleting the product.")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("An error occurred while deleting the product.")
    }
  }

  return (
    <>
      <tr key={`${product.productID}-${product.categoryID}`}>
        <td>
          <img src={product.image} alt={product.productName} className="table-img" />
        </td>
        <td>{product.productName}</td>
        <td>{product.category?.name || 'N/A'}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td>
          <button className="card-btn" onClick={() => setModalShow(true)}>
            Edit
          </button>
          <EditProduct show={modalShow} onHide={() => setModalShow(false)} product={product} />
          <button
            className="card-btn"
            onClick={() => {
              handleDelete(product.productID)
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default SingleProduct
