import { AppDispatch } from "@/toolkit/Store"
import { removeProductFromCart } from "@/toolkit/slices/cartSlice"
import { Cart } from "@/types/Cart"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const SingleProductInCart = (props: { product: Cart }) => {
  const { product } = props

  const dispatch: AppDispatch = useDispatch()

  const handleRemoveFromCart = async (productID: string) => {
    const response = await dispatch(removeProductFromCart(productID));
    console.log(response);
  };

  return (
    <>
      <div className="cart-item d-md-flex justify-content-between">
        <span className="remove-item">
         <button className="border-0 opacity-25" onClick={() => {handleRemoveFromCart(product.productID)}}>X</button>
        </span>
        <div className="px-3 my-3">
          <a className="cart-item-product" href="#">
            <div className="cart-item-product-thumb">
              <img src={product.image} alt={product.productName} />
            </div>
            <div className="cart-item-product-info">
              <h4 className="cart-item-product-title">{product.productName}</h4>
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
