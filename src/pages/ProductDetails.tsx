import PageTitle from "@/components/PageTitle"
import { AppDispatch, RootState } from "@/toolkit/Store"
import { fetchProductById } from "@/toolkit/slices/productSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const ProductDetails = () => {
  const { identifier } = useParams<{ identifier: string }>()

  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductById(identifier))
    }
    fetchData()
  }, [])

  return (
    <section className="py-20 overflow-hidden">
      <PageTitle title="Product Details" />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error{error}</p>}
      {product && (
        <div className="container">
          <div className="row mb-24">
            <div className="col-12 col-md-6 mb-8 mb-md-0">
              <div className="position-relative mb-10" style={{ height: "564px" }}>
                <a className="position-absolute top-50 start-0 ms-8 translate-middle-y" href="#">
                  <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="">
                    <path
                      d="M9 16.0185C9.268 16.2905 9.268 16.7275 9 16.9975C8.732 17.2675 8.299 17.2685 8.031 16.9975L0.201 9.0895C-0.067 8.8195 -0.067 8.3825 0.201 8.1105L8.031 0.2025C8.299 -0.0675 8.732 -0.0675 9 0.2025C9.268 0.4735 9.268 0.9115 9 1.1815L1.859 8.6005L9 16.0185Z"
                      fill="#1F40FF"
                    ></path>
                  </svg>
                </a>
                <img
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                  src={product.image}
                  alt="text"
                />
                <a className="position-absolute top-50 end-0 me-8 translate-middle-y" href="#">
                  <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="">
                    <path
                      d="M0.19922 1.1817C-0.0687795 0.909696 -0.0687794 0.472695 0.19922 0.202695C0.46722 -0.0673054 0.90022 -0.0683048 1.16822 0.202695L8.99822 8.11069C9.26622 8.3807 9.26622 8.81769 8.99822 9.08969L1.16822 16.9977C0.900219 17.2677 0.467218 17.2677 0.199219 16.9977C-0.0687809 16.7267 -0.0687808 16.2887 0.199219 16.0187L7.34022 8.5997L0.19922 1.1817Z"
                      fill="#1F40FF"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="row">
                <div className="col-6 col-sm-3 p-2">
                  <a className="d-block border" href="#">
                    <img
                      className="w-100 img-fluid"
                      style={{ height: "128px" }}
                      src={product.image}
                      alt={product.productID}
                    />
                  </a>
                </div>
                <div className="col-6 col-sm-3 p-2">
                  <a className="d-block" href="#">
                    <img
                      className="w-100 img-fluid"
                      style={{ height: "128px" }}
                      src={product.image}
                      alt={product.productID}
                    />
                  </a>
                </div>
                <div className="col-6 col-sm-3 p-2">
                  <a className="d-block" href="#">
                    <img
                      className="w-100 img-fluid"
                      style={{ height: "128px" }}
                      src={product.image}
                      alt={product.productID}
                    />
                  </a>
                </div>
                <div className="col-6 col-sm-3 p-2">
                  <a className="d-block" href="#">
                    <img
                      className="w-100 img-fluid"
                      style={{ height: "128px" }}
                      src={product.image}
                      alt={product.productID}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="ps-lg-20">
                <div className="mb-10 pb-10 border-bottom">
                  <span className="text-secondary">{product.productName}</span>
                  <h1 className="mt-2 mb-6 mw-xl fs-1">{product.description}</h1>
                  <div className="mb-8">
                    <button className="btn p-0">
                      <img className="img-fluid" src="" alt="star" />
                    </button>
                    <button className="btn p-0">
                      <img className="img-fluid" src="" alt="" />
                    </button>
                    <button className="btn p-0">
                      <img className="img-fluid" src="" alt="" />
                    </button>
                    <button className="btn p-0">
                      <img className="img-fluid" src="" alt="" />
                    </button>
                    <button className="btn p-0">
                      <img className="img-fluid" src="" alt="" />
                    </button>
                  </div>
                  <p className="d-inline-block mb-8 h5 text-dark">
                    <span>SAR29.99</span>
                    <span
                      className="fw-normal text-secondary text-decoration-line-through p-2"
                      style={{ fontSize: "16px" }}
                    >
                      SAR{product.price}
                    </span>
                  </p>
                  <p className="mw-md text-secondary">
                   {product.description}
                  </p>
                </div>
                <div className="d-flex mb-12">
                  <div className="me-6">
                    <span className="d-block mb-4 fw-bold text-secondary tetx-uppercase">QTY</span>
                    <div className="d-inline-flex align-items-center px-4 fw-bold text-secondary border rounded-2">
                      <button className="btn px-0 py-2">
                        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="">
                          <g opacity="0.35">
                            <rect
                              x="12"
                              width="2"
                              height="12"
                              transform="rotate(90 12 0)"
                              fill="currentColor"
                            ></rect>
                          </g>
                        </svg>
                      </button>
                      <input
                        className="form-control m-0 px-2 py-4 text-center text-md-end border-0"
                        style={{ width: "48px" }}
                        type="number"
                        placeholder="1"
                      />
                      <button className="btn px-0 py-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="">
                          <g opacity="0.35">
                            <rect x="5" width="2" height="12" fill="currentColor"></rect>
                            <rect
                              x="12"
                              y="5"
                              width="2"
                              height="12"
                              transform="rotate(90 12 5)"
                              fill="currentColor"
                            ></rect>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="d-block mb-4 fw-bold text-secondary text-uppercase">Size</span>
                    <select
                      className="form-select border ps-6 pe-10 py-4 fw-bold text-secondary"
                      name=""
                      id=""
                    >
                      <option value="1">Medium</option>
                      <option value="2">Small</option>
                      <option value="3">Large</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-14">
                  <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <a className="btn w-100 btn-primary mt-2" href="#">
                      Add to cart
                    </a>
                  </div>
                  <div className="col-12 col-xl-4">
                    <a
                      className="h-100 ms-auto ms-sm-0 flex-shrink-0 d-inline-flex me-4 align-items-center justify-content-center rounded-2 border"
                      href="#"
                      style={{ width: "64px", minHeight: "52px" }}
                    >
                      <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="">
                        <path
                          d="M13.4993 26.2061L4.70067 16.9253C3.9281 16.1443 3.41815 15.1374 3.24307 14.0471C3.06798 12.9568 3.23664 11.8385 3.72514 10.8505V10.8505C4.09415 10.1046 4.63318 9.45803 5.29779 8.96406C5.96241 8.47008 6.73359 8.14284 7.54782 8.00931C8.36204 7.87578 9.19599 7.93978 9.98095 8.19603C10.7659 8.45228 11.4794 8.89345 12.0627 9.48319L13.4993 10.9358L14.9359 9.48319C15.5192 8.89345 16.2327 8.45228 17.0177 8.19603C17.8026 7.93978 18.6366 7.87578 19.4508 8.00931C20.265 8.14284 21.0362 8.47008 21.7008 8.96406C22.3654 9.45803 22.9045 10.1046 23.2735 10.8505V10.8505C23.762 11.8385 23.9306 12.9568 23.7556 14.0471C23.5805 15.1374 23.0705 16.1443 22.298 16.9253L13.4993 26.2061Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </a>
                    <a
                      className="flex-shrink-0 h-100 d-inline-flex align-items-center justify-content-center rounded-2 border"
                      href="#"
                      style={{ width: "64px", minHeight: "52px" }}
                    >
                      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="">
                        <path
                          d="M2.01328 18.9877C2.05682 16.7902 2.71436 12.9275 6.3326 9.87096L6.33277 9.87116L6.33979 9.86454L6.3398 9.86452C6.34682 9.85809 8.64847 7.74859 13.4997 7.74859C13.6702 7.74859 13.8443 7.75111 14.0206 7.757L14.0213 7.75702L14.453 7.76978L14.6331 7.77511V7.59486V3.49068L21.5728 10.5736L14.6331 17.6562V13.6558V13.5186L14.4998 13.4859L14.1812 13.4077C14.1807 13.4075 14.1801 13.4074 14.1792 13.4072M2.01328 18.9877L14.1792 13.4072M2.01328 18.9877C7.16281 11.8391 14.012 13.3662 14.1792 13.4072M2.01328 18.9877L14.1792 13.4072M23.125 10.6961L23.245 10.5736L23.125 10.4512L13.7449 0.877527L13.4449 0.571334V1V6.5473C8.22585 6.54663 5.70981 8.81683 5.54923 8.96832C-0.317573 13.927 0.931279 20.8573 0.946581 20.938L0.946636 20.9383L1.15618 22.0329L1.24364 22.4898L1.47901 22.0885L2.041 21.1305L2.04103 21.1305C4.18034 17.4815 6.71668 15.7763 8.8873 15.0074C10.9246 14.2858 12.6517 14.385 13.4449 14.4935V20.1473V20.576L13.7449 20.2698L23.125 10.6961Z"
                          fill="black"
                          stroke="black"
                          strokeWidth="0.35"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <p className="me-8 mb-0 text-secondary fw-bold text-uppercase">SHARE IT</p>
                  <a className="me-1" href="#" style={{ width: "32px", height: "32px" }}>
                    <img className="img-fluid" src="" alt="X" />
                  </a>
                  <a className="me-1" href="#" style={{ width: "32px", height: "32px" }}>
                    <img className="img-fluid" src="" alt="" />
                  </a>
                  <a href="#" style={{ width: "32px", height: "32px" }}>
                    <img className="img-fluid" src="" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row mb-16 border-bottom border-2">
              <div className="col-6 col-md-auto">
                <a className="btn bg-white text-secondary rounded-0 shadow" href="#">
                  Description
                </a>
              </div>
              <div className="col-6 col-md-auto">
                <a className="btn text-secondary" href="#">
                  Customer reviews
                </a>
              </div>
              <div className="col-6 col-md-auto">
                <a className="btn text-secondary" href="#">
                  Shipping & returns
                </a>
              </div>
              <div className="col-6 col-md-auto">
                <a className="btn text-secondary" href="#">
                  Brand
                </a>
              </div>
            </div>
            <h3 className="mb-8 text-info">{product.productName}</h3>
            <p className="mw-2xl text-secondary">
              {product.description}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
