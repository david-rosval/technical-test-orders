import { useEffect, useState } from "react"
import { Product, ProductTableRow } from "../types"
import { getProducts } from "../utils/api"

export default function AddNewProductButton({
  setProducts,
  products
}: {
  setProducts: React.Dispatch<React.SetStateAction<ProductTableRow[]>>
  products: ProductTableRow[]
}) {
  const [productsModal, setProductsModal] = useState(false)
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])

  useEffect(() => {
    const obtainedProducts = getProducts()
    setAvailableProducts(obtainedProducts)
  }, [])
  

  const toggleModal = () => {
    setProductsModal(prev => !prev)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    
    const productIdItem = elements.namedItem("productId")
    const quantityItem = elements.namedItem("quantity")

    const isInputProductId = productIdItem instanceof HTMLSelectElement
    const isInputQuantity = quantityItem instanceof HTMLInputElement

    if (!isInputProductId || !isInputQuantity) return

    const productId = parseInt(productIdItem.value)

    const quantity = parseInt(quantityItem.value)

    const product = availableProducts.find(product => product.id === productId)

    if (!product) return 

    const { unitPrice, name } = product

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
      productExisting.quantity += quantity
      productExisting.subTotal += subTotal

      setProducts(prev => [...(prev.filter(prod => prod.id !== newProductTableRow.id)), productExisting])
    }

    
    // pass the state
    //console.log(newOrderProduct)

    setProductsModal(false)
  }

  return (
    <>
      <button onClick={toggleModal}>+ New Product</button>
      {productsModal && (
        <div>
          <form action="post" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="productId">Product: </label>
              <select name="productId" id="productId">
                <option value="">--Please choose an option--</option>
                {availableProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
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
