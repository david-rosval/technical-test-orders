import { useState } from "react"
import { OrderProduct } from "../types"
import { SAMPLE_PRODUCTS } from "../consts"

export default function AddNewProductButton({
  products,
  setProducts
}: {
  products: OrderProduct[]
  setProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>
}) {
  const [productsModal, setProductsModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>() 

  const toggleModal = () => {
    setProductsModal(prev => !prev)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <button onClick={toggleModal}>+ New Product</button>
      {productsModal && (
        <div>
          <form action="post" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="product">Product: </label>
              <select name="product" id="product" value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)}>
                <option value="">--Please choose an option--</option>
                {SAMPLE_PRODUCTS.map((p) => (
                  <option value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity">Quantity: </label>
              <input type="number" min={1} defaultValue={1} />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
