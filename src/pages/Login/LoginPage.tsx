import Navigationbar from "@/components/Navigation/Navigationbar"
import { AppDispatch } from "@/toolkit/Store"
import { loginUser } from "@/toolkit/slices/userSlice"
import { LoginFormData } from "@/types/User"
import { Button } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      if (response.payload.success == true) {
        toast.success(response.payload.message)

        const isAdmin = response.payload.data.loggedInUser.isAdmin
        navigate(isAdmin ? "/admin/dashboard" : "/profile")
      } else {
        toast.error(response.payload.message)
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed")
    }
  }
  return (
    <>
      <Navigationbar />
      <div className="Login pt-5">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "email is not valid" }
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "" }
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button className="btn" type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </>
  )
}
