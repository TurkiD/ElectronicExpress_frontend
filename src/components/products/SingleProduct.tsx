import { Product } from "@/types"
import { FaBagShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props

  return (
    <Link to={`/product/${product.productID}`}>
      <section className="card">
        <img className="card-img" src={product.image} alt={product.productName} />
        <div className="card-details">
          <h3 className="card-title">name</h3>
          <section className="card-review">
            <p>review here</p>
            <span className="total-review">total review here</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>SAR500</del> SAR200
            </div>
            <div className="bag">
              <FaBagShopping className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </Link>
  )
}

export default SingleProduct
