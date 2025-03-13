
import { useState } from "react"
import useProducts from "../hooks/useProducts"
import { ProductTableRow } from "../types"

export default function AddNewProductButton({
  setOrderProducts,
  orderProducts
}: {
  setOrderProducts: React.Dispatch<React.SetStateAction<ProductTableRow[]>>
  orderProducts: ProductTableRow[]
}) {
  const [productsModal, setProductsModal] = useState(false)
  const { products: availableProducts, loading, error } = useProducts()

  

  const toggleModal = () => {
    setProductsModal(prev => !prev)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // GET FORM VALUES --------------------------

    const { elements } = event.currentTarget

    
    const productIdItem = elements.namedItem("productId")
    const quantityItem = elements.namedItem("quantity")

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

    console.log(productExisting)

    if (!productExisting) {
      setOrderProducts(prev => [...(prev.filter(prod => prod.productId !== productFound.id)), newProductTableRow])
    } else {
      const prevQty = Number(productExisting.quantity)
      const prevSubtotal = Number(productExisting.subTotal)

      productExisting.quantity = quantityValue + prevQty
      productExisting.subTotal = subTotal + prevSubtotal

      setOrderProducts(prev => [...(prev.filter(prod => prod.productId !== newProductTableRow.productId)), productExisting])
    }


    setProductsModal(false)
    console.log(orderProducts)
  }

  return (
    <>
      <button onClick={toggleModal}>+ New Product</button>
      {productsModal && (
        <div>
          <form action="post" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="productId">Product: </label>
              {!error ? (
                <select name="productId" id="productId">
                  <option value="">--Please choose an option--</option>
                  {loading && (
                    <option value="" disabled>--Loading products--</option>
                  )}
                  {availableProducts && availableProducts.length > 0 && availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              ) : (
                <p>Products not found</p>
              )}
            </div>
            <div>
              <label htmlFor="quantity">Quantity: </label>
              <input type="number" name="quantity" min={1} defaultValue={1} />
            </div>
            <button type="submit">Confirm & Save</button>
          </form>
        </div>
      )}
    </>
  )
}
