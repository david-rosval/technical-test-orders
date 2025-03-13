import { useState } from "react"
import { ProductTableRow } from "../types"
import useProducts from "../hooks/useProducts"

export default function EditOrderProductButton({
  orderProduct,
  orderProducts,
  setOrderProducts,
}: {
  orderProduct: ProductTableRow
  orderProducts: ProductTableRow[]
  setOrderProducts: React.Dispatch<React.SetStateAction<ProductTableRow[]>>
}) {


  const { products: availableProducts } = useProducts()
  const [editModal, setEditModal] = useState(false)
  
  const toggleModal = () => setEditModal(prev => !prev)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // GET FORM VALUES --------------------------

    const { elements } = event.currentTarget

    
    const productIdItem = elements.namedItem("productIdEdited")
    const quantityItem = elements.namedItem("quantityEdited")

    const isInputProductId = productIdItem instanceof HTMLSelectElement
    const isInputQuantity = quantityItem instanceof HTMLInputElement

    if (!isInputProductId || !isInputQuantity) return

    const productIdValue = parseInt(productIdItem.value)

    const quantityValue = parseInt(quantityItem.value)

    // -------------------------------------------

    const productFound = availableProducts.find(product => product.id === productIdValue)

    if (!productFound) return 

    const { unitPrice, name } = productFound

    const subTotal = unitPrice * quantityValue


    const newProductTableRow: ProductTableRow = {
      id: productIdValue,
      productId: productIdValue,
      name,
      unitPrice,
      quantity: quantityValue,
      subTotal,
    }

    const productExisting = orderProducts.find(prod => prod.productId === newProductTableRow.productId)

    if (!productExisting) {
      setOrderProducts(prev => [...(prev.filter(orderProd => orderProd.productId !== productFound.id)), newProductTableRow])
    } else {
      productExisting.quantity = quantityValue
      productExisting.subTotal = subTotal

      setOrderProducts(prev => [...(prev.filter(orderProd => orderProd.productId !== newProductTableRow.productId)), productExisting])
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
              <select name="productIdedited" id="productIdEdited" defaultValue={orderProduct.productId}>
                <option value="">--Please choose an option--</option>
                {availableProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantityEdited">Quantity: </label>
              <input type="number" name="quantityEdited" min={1} defaultValue={orderProduct.quantity} />
            </div>
            <button type="submit">Confirm & Save</button>
          </form>
        </div>
      )}
    </>
  )
}
