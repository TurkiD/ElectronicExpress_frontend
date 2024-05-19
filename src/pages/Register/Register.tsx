import { AppDispatch } from "@/toolkit/Store"
import { registerUser } from "@/toolkit/slices/userSlice"
import { Button } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type FormData = {
  username: string
  email: string
  password: string
  image: string
}

export const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await dispatch(registerUser(data))      
      if (response.payload.success == true) {
        toast.success(response.payload.message)
        navigate("/login")
      }
      else {
        toast.error(response.payload.message)
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed")
    }
  }
  return (
    <div className="register">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Name is required",
              minLength: { value: 2, message: "" }
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
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
          Sign up
        </Button>
      </form>
    </div>
  )
}
