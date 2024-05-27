import EditProduct from "@/components/Modal/ProductModal/EditProduct"
import { AppDispatch } from "@/toolkit/Store"
import { deleteProduct } from "@/toolkit/slices/productSlice"
import { User } from "@/types/User"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const SingleUser = (props: { user: User }) => {
  const { user } = props
  const dispatch: AppDispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)

  const handleDelete = async (userId: string) => {
    console.log(userId);
    
    // try {
    //   const response = await dispatch(deleteUser(userId))
    //   if (response.meta.requestStatus === "fulfilled") {
    //     toast.success("Product Deleted")
    //   } else {
    //     toast.error("An error occurred while deleting the product.")
    //   }
    // } catch (error) {
    //   console.error("Error deleting product:", error)
    //   toast.error("An error occurred while deleting the product.")
    // }
  }

  return (
    <>
      <tr key={user.userID}>
        <td>{user.userID}</td>
        <td>
          <img src={user.image} alt={user.username} className="table-img" />
        </td>
        <td>{user.username}</td>    
        <td>{user.email}</td>
        <td>{user.isAdmin ? "Yes" : "No"}</td>
        <td>{user.isBanned ? "Yse" : "No"}</td>
        <td>
          <button className="card-btn" onClick={() => setModalShow(true)}>
            Edit
          </button>
          {/* <EditProduct show={modalShow} onHide={() => setModalShow(false)} product={product} /> */}
          <button
            className="card-btn"
            onClick={() => {
              handleDelete(user.userID)
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default SingleUser
