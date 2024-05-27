import { AppDispatch } from "@/toolkit/Store"
import { Order } from "@/types/Order"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const SingleOrder = (props: { order: Order }) => {
  const { order } = props
  const dispatch: AppDispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)

  const handleDelete = async (orderId: string) => {
    // try {
    //   const response = await dispatch(deleteUser(orderId))
    //   if (response.meta.requestStatus === "fulfilled") {
    //     toast.success("User Deleted")
    //   } else {
    //     toast.error("An error occurred while deleting the user.")
    //   }
    // } catch (error) {
    //   console.error("Error deleting user:", error)
    //   toast.error("An error occurred while deleting the user.")
    // }
  }

  return (
    <>
      <tr key={order.orderId}>
        <td>{order.orderId}</td>
        <td>
          {(() => {
            switch (order.payment.toString()) {
              case "0":
                return "CreditCard"
              case "1":
                return "ApplePay"
              case "2":
                return "Visa"
              case "3":
                return "Cash"
              case "4":
                return "PayPal"
              default:
                return "Unknown"
            }
          })()}
        </td>
        <td>{order.amount}</td>
        <td>
          {(() => {
            switch (order.status.toString()) {
              case "0":
                return "Creating"
              case "1":
                return "Pending"
              case "2":
                return "Processing"
              case "3":
                return "Shipped"
              case "4":
                return "Delivered"
              default:
                return "Unknown"
            }
          })()}
        </td>
        <td>
          <button className="card-btn" onClick={() => setModalShow(true)}>
            Edit
          </button>
          {/* <EditProduct show={modalShow} onHide={() => setModalShow(false)} user={user} /> */}
          <button
            className="card-btn"
            onClick={() => {
              handleDelete(order.orderId)
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default SingleOrder
