import Navigationbar from "@/components/Navigation/Navigationbar"
import { AppDispatch } from "@/toolkit/Store"
import { loginUser } from "@/toolkit/slices/userSlice"
import { LoginFormData } from "@/types/User"
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
      <section className="position-relative py-5">
        <div className="d-none d-md-block position-absolute top-0 start-0 w-75 h-100"></div>
        <div className="d-md-none position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="container position-relative mx-auto">
          <div className="row align-items-center">
            <div className="col-12 col-md-8 col-lg-5 mb-5">
              <div>
                <h2 className="display-5 fw-bold mb-4 text-dark">
                  Lorem ipsum dolor sit amet consectutar domor at elis
                </h2>
                <p className="mb-0 text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh,
                  pulvinar vitae aliquet nec, accumsan aliquet orci.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-10 col-lg-5 ms-auto">
              <div className="p-5 bg-light rounded text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <span className="text-muted">Sign In</span>
                  <h3 className="fw-bold mb-5">Join our community</h3>
                  <input
                    className="form-control mb-2"
                    type="email"
                    placeholder="E-mail address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "email is not valid"
                      }
                    })}
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  <input
                    className="form-control mb-2"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "" }
                    })}
                  />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  <button className="btn btn-primary py-2 w-100 mb-4" type="submit">
                    Sign in
                  </button>
                  <a className="link-secondary d-inline-block mb-4" href="#">
                    <small>Forgot password?</small>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
