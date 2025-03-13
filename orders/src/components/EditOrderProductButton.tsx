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
      <button className="rounded bg-blue-300 dark:bg-blue-500 px-3 py-2 cursor-pointer" onClick={toggleModal}>Edit</button>
      {editModal && (
        <div className="fixed inset-0 bg-neutral-900/40 grid place-items-center">
          <form className="bg-slate-100 dark:bg-neutral-700 p-5 rounded-lg shadow-lg flex flex-col gap-3" action="post" onSubmit={handleSubmit} >
            <h3 className="text-xl font-semibold">Edit Order Product</h3>
            <div className="flex items-center justify-between gap-4">
              <label  htmlFor="productIdEdited">Product: </label>
              <select name="productIdedited" id="productIdEdited" className="bg-neutral-100 dark:bg-neutral-800 rounded py-2 px-3 disabled:text-neutral-50/30" defaultValue={orderProduct.productId}>
                <option value="">--Please choose an option--</option>
                {availableProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="quantityEdited">Quantity: </label>
              <input className="w-20 text-right bg-neutral-100 dark:bg-neutral-800 rounded py-2 px-3" type="number" name="quantityEdited" min={1} defaultValue={orderProduct.quantity} />
            </div>
            <button type="submit" className="p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-block bg-green-400  dark:bg-green-600  hover:bg-green-500/80 dark:hover:bg-green-600/80 font-semibold w-fit mt-5 cursor-pointer">Confirm & Save</button>
          </form>
        </div>
      )}
    </>
  )
}
