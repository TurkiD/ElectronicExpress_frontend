import { useDispatch, useSelector } from "react-redux"
import "./CartPage.css"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { useEffect } from "react"
import { fetchCart } from "@/toolkit/slices/cartSlice"
import PageTitle from "@/components/PageTitle"
import SingleProductInCart from "./SingleProductInCart"

export const CartPage = () => {
  const { carts, isLoading, error } = useSelector((state: RootState) => state.cartR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCart())
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="container pb-5 mb-2">
        <PageTitle title="Cart" />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {carts &&
          carts.map((product) => <SingleProductInCart key={product.productID} product={product} />)}
        <div className="d-sm-flex justify-content-between align-items-center text-center text-sm-left">
          <form className="form-inline py-2">
            <label className="sr-only">Coupon code</label>
            <input
              className="form-control form-control-sm my-2 mr-3"
              type="text"
              placeholder="Coupon code"
              required
            />
            <button
              className="btn btn-style-1 btn-secondary btn-sm my-2 mx-auto mx-sm-0"
              type="submit"
            >
              Apply Coupon
            </button>
          </form>
          <div className="py-2">
            <span className="d-inline-block align-middle text-sm text-muted font-weight-medium text-uppercase mr-2">
              Subtotal:
            </span>
            <span className="d-inline-block align-middle text-xl font-weight-medium">$188.50</span>
          </div>
        </div>
        <hr className="my-2" />
        <div className="row pt-3 pb-5 mb-2">
          <div className="col-sm-6 mb-3">
            <a className="btn btn-style-1 btn-secondary btn-block" href="#">
              <i className="fe-icon-refresh-ccw"></i>&nbsp;Update Cart
            </a>
          </div>
          <div className="col-sm-6 mb-3">
            <a className="btn btn-style-1 btn-primary btn-block" href="checkout-address.html">
              <i className="fe-icon-credit-card"></i>&nbsp;Checkout
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
