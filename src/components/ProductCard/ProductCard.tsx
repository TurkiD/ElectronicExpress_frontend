import { Product } from "@/types/Product"
import { FaBagShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <Link className="text-decoration-none" to={`/product/${product.productID}`}>
          <img src={product.image} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{product.description.substring(0, 30)}...</p>
          <a href={`/product/${product.productID}`} className="btn btn-primary">
            View details
          </a>
          <a href="#" className="ms-3 btn btn-primary">
            <FaBagShopping className="bag-icon" />
          </a>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
