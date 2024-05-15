import  Sidebar  from "../layout/sidebars/Sidebar"
import "./Products.css"

import { FaBagShopping } from "react-icons/fa6"

const Products = () => {
  return (
    <>
      <Sidebar />
      <section className="card-container">
        <section className="card">
          <img
            className="card-img"
            src="https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg"
            alt="lap-top"
          />
          <div className="card-details">
            <h3 className="card-title">Name of product here</h3>
            <section className="card-review">
              <p>review here</p>
              <span className="total-review">total review here</span>
            </section>
            <section className="card-price">
              <div className="price">
                <del>$300 price here</del> $200 new price
              </div>
              <div className="bag">
                <FaBagShopping className="bag-icon" />
              </div>
            </section>
          </div>
        </section>
      </section>
    </>
  )
}

export default Products
