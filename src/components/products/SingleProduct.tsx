// import { Product } from "@/types"
import { Product } from "@/types"
import { FaBagShopping } from "react-icons/fa6"

// const SingleProduct = (props: {product: Product}) => {
const SingleProduct = () => {
  // const {product} = props;
  return (
    <section className="card">
      <img className="card-img" src="" alt="lap-top" />
      <div className="card-details">
        <h3 className="card-title">name</h3>
        <section className="card-review">
          <p>review here</p>
          <span className="total-review">total review here</span>
        </section>
        <section className="card-price">
          <div className="price">
            <del>SAR500</del> SAR200 new price
          </div>
          <div className="bag">
            <FaBagShopping className="bag-icon" />
          </div>
        </section>
      </div>
    </section>
  )
}

export default SingleProduct
