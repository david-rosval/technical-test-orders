import { useNavigate, useParams } from "react-router"
import { createProduct, getProduct, updateProduct } from "../utils/products.api"
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export default function AddEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>("")
  const [unitPrice, setUnitPrice] = useState<number>(0)

  useEffect(() => {
    async function getOrderById() {
      setLoading(true)
      try {
        const result = await getProduct(id)

        setName(result.name)
        setUnitPrice(result.unitPrice)
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false)
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    if (id && !Number.isNaN(id)) {
      getOrderById()
    }
  }, [id])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // GET FORM VALUES --------------------------

    const { elements } = event.currentTarget

    
    const nameItem = elements.namedItem("name")
    const unitPriceItem = elements.namedItem("unitPrice")

    const isInputName = nameItem instanceof HTMLInputElement
    const isInputUnitPrice = unitPriceItem instanceof HTMLInputElement

    if (!isInputName || !isInputUnitPrice) return

    const nameValue = nameItem.value

    const unitPriceValue = Number(unitPriceItem.value)

    // -------------------------------------------

    if (!id) {
      try {
        const result = await createProduct({ product: { name: nameValue, unitPrice: unitPriceValue }})
        console.log(result)
        navigate("/products")
        
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const result = await updateProduct(id, { product: { name: nameValue, unitPrice: unitPriceValue }})
        console.log(result)
        navigate("/products")
        
      } catch (error) {
        console.log(error)
      }
    }

    
  }

  return (
    <div>
      <h1>{id ? "Edit" : "Add"} Product</h1>
      {!error ? (
        <form action="post" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" defaultValue={!name ? "" : name}  />
            {loading && (
              <Loader />
            )}
          </div>
          <div> 
            <label htmlFor="unitPrice">Unit Price {"($)"}: </label>
            <input type="number" name="unitPrice" defaultValue={!unitPrice ? "" : unitPrice}/> 
            {loading && (
              <Loader />
            )}
          </div>
          <div>
            <button disabled={loading ? true : false} type="submit">Save & {id ? "Edit" : "Create"} Product</button>
          </div>
        </form>
      ): (
        <p>There has been an error fetch the selected product</p>
      )}
      
    </div>
  )
}
