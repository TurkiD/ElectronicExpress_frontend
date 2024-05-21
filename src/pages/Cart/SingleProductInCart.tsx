import { Cart } from "@/types/Cart"
import React from "react"

const SingleProductInCart = (props: { product: Cart }) => {
  const { product } = props
  return (
    <>
      <div className="cart-item d-md-flex justify-content-between">
        <span className="remove-item">
          <i className="fa fa-times"></i>
        </span>
        <div className="px-3 my-3">
          <a className="cart-item-product" href="#">
            <div className="cart-item-product-thumb">
              <img src={product.image} alt={product.productName} />
            </div>
            <div className="cart-item-product-info">
              <h4 className="cart-item-product-title">Canon EOS M50 Mirrorless Camera</h4>
              <span>
                <strong>Type:</strong> Mirrorless
              </span>
              <span>
                <strong>Color:</strong> Black
              </span>
            </div>
          </a>
        </div>
        <div className="px-3 my-3 text-center">
          <div className="cart-item-label">Quantity</div>
          <div className="count-input">
            <select className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </div>
        </div>
        <div className="px-3 my-3 text-center">
          <div className="cart-item-label">Subtotal</div>
          <span className="text-xl font-weight-medium">{product.price}SAR</span>
        </div>
      </div>
    </>
  )
}

export default SingleProductInCart
