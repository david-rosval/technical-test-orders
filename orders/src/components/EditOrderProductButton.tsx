import { useState } from "react"
import { ProductTableRow } from "../types"
import { SAMPLE_PRODUCTS } from "../consts"

export default function EditOrderProductButton({
  product,
  setProducts,
  products
}: {
  product: ProductTableRow
  setProducts: React.Dispatch<React.SetStateAction<ProductTableRow[]>>
  products: ProductTableRow[]
}) {
  const [editModal, setEditModal] = useState(false)
  
  const toggleModal = () => setEditModal(prev => !prev)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    
    const productIdItem = elements.namedItem("productIdEdited")
    const quantityItem = elements.namedItem("quantityEdited")

    const isInputProductId = productIdItem instanceof HTMLSelectElement
    const isInputQuantity = quantityItem instanceof HTMLInputElement

    if (!isInputProductId || !isInputQuantity) return

    const productId = parseInt(productIdItem.value)

    const quantity = parseInt(quantityItem.value)

    const productFound = SAMPLE_PRODUCTS.find(p => p.id === productId)

    if (!productFound) return 

    const { unitPrice, name } = productFound

    const subTotal = unitPrice * quantity

    //const newOrderProduct: OrderProduct = { productId, quantity, unitPrice, subTotal } // to the db

    const newProductTableRow: ProductTableRow = {
      id: productId,
      name,
      unitPrice,
      quantity,
      subTotal,
    }

    const productExisting = products.find(prod => prod.id === newProductTableRow.id)

    if (!productExisting) {
      setProducts(prev => [...(prev.filter(prod => prod.id !== product.id)), newProductTableRow])
    } else {
      productExisting.quantity = quantity
      productExisting.subTotal = subTotal

      setProducts(prev => [...(prev.filter(prod => prod.id !== productExisting.id)), productExisting])
    }


    setEditModal(false)
  }

  return (
    <>
      <button className="edit-button" onClick={toggleModal}>Edit</button>
      {editModal && (
        <div>
          <form action="post" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="productIdEdited">Product: </label>
              <select name="productIdedited" id="productIdEdited" defaultValue={product.id}>
                <option value="">--Please choose an option--</option>
                {SAMPLE_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantityEdited">Quantity: </label>
              <input type="number" name="quantityEdited" min={1} defaultValue={product.quantity} />
            </div>
            <button type="submit">Confirm & Save</button>
          </form>
        </div>
      )}
    </>
  )
}
