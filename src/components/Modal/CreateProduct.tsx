import { AppDispatch } from "@/toolkit/Store"
import { updateProduct } from "@/toolkit/slices/productSlice"
import { Product } from "@/types/Category"

import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

interface PopupProps {
  onHide: () => void
  show: boolean
  product: Product
}

const CreateProduct: React.FC<PopupProps> = (props) => {
  const { onHide, product } = props
  const dispatch: AppDispatch = useDispatch()

  const [productName, setProductName] = useState(product.productName)
  const [productDescription, setProductDescription] = useState(product.description)

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const updateProductData = {
      productName: productName,
      description: productDescription
    }

    try {
      const response = await dispatch(
        updateProduct({ productId: product.productID, updateProductData: updateProductData })
      );

      if (response.payload.success) {
        toast.success(response.payload.message);
        onHide();
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('An error occurred while updating the product.');
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value)
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductDescription(event.target.value)
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              name="productName"
              onChange={handleNameChange}
              value={productName}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleDescriptionChange}
              value={productDescription}
              className="form-control mw-100"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateProduct
