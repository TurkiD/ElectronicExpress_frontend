import EditProduct from "@/components/Modal/EditProduct"
import { Product } from "@/types/Product"
import { useState } from "react"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props

  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [modalShow, setModalShow] = useState(false)

  const handleDelete = async (productId: string) => {
    // const response = await dispatch(deleteProduct(productId))
    // if (response.meta.requestStatus === "fulfilled") {
    //   toast.success("Product Deleted")
    // } else {
    //   toast.error(response.meta.requestStatus)
    // }
  }
  return (
    <tbody>
      <tr key={`${product.productID}-${product.categoryID}`}>
        <td>
          <img src={product.image} alt={product.productName} className="table-img" />
        </td>
        <td>{product.productName}</td>
        <td>{product.category.name}</td>
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
    </tbody>
  )
}

export default SingleProduct
