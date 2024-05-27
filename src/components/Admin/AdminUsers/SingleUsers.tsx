import { AppDispatch } from "@/toolkit/Store"
import { deleteUser } from "@/toolkit/slices/userSlice"
import { User } from "@/types/User"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const SingleUser = (props: { user: User }) => {
  const { user } = props
  const dispatch: AppDispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)

  const handleDelete = async (userId: string) => {    
    try {
      const response = await dispatch(deleteUser(userId))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("User Deleted")
      } else {
        toast.error("An error occurred while deleting the user.")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("An error occurred while deleting the user.")
    }
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
          {/* <EditProduct show={modalShow} onHide={() => setModalShow(false)} user={user} /> */}
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
