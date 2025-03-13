
import { useEffect, useRef, useState } from "react"
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

  const addOrderProductRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (productsModal && addOrderProductRef.current && !addOrderProductRef.current.contains(e.target as Node)) {
        setProductsModal(false)
      }
    }
    
    document.addEventListener("mousedown", closeModal)
    return () => {
      document.removeEventListener("mousedown", closeModal)
    }
  }, [productsModal])
  

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
  }

  return (
    <>
      <button className="p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-block bg-neutral-400  dark:bg-neutral-700  hover:bg-neutral-400/80 dark:hover:bg-neutral-700/80 my-4" type="button" onClick={toggleModal}>+ New Product</button>
      {productsModal && (
        <div className="fixed inset-0 bg-neutral-900/40 grid place-items-center">
          <form ref={addOrderProductRef} action="post" onSubmit={handleSubmit} className="bg-slate-100 dark:bg-neutral-700 p-5 rounded-lg shadow-lg flex flex-col gap-3" >
            <h3 className="text-xl font-semibold">Add Product</h3>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="productId">Product: </label>
              {!error ? (
                <select name="productId" id="productId" className="bg-neutral-100 dark:bg-neutral-800 rounded py-2 px-3 disabled:text-neutral-50/30">
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
            <div className="flex items-center justify-between gap-4">
              <label  htmlFor="quantity">Quantity: </label>
              <input className="w-20 text-right bg-neutral-100 dark:bg-neutral-800 rounded py-2 px-3" type="number" name="quantity" min={1} defaultValue={1} />
            </div>
            <button className="p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-block bg-green-400  dark:bg-green-600  hover:bg-green-500/80 dark:hover:bg-green-600/80 font-semibold w-fit mt-5" type="submit">Confirm & Save</button>
          </form>
        </div>
      )}
    </>
  )
}
