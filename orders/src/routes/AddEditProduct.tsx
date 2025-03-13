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
  const [emptyError, setEmptyError] = useState<string>("")

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
    
    setEmptyError("")

    // GET FORM VALUES --------------------------

    const { elements } = event.currentTarget

    
    const nameItem = elements.namedItem("name")
    const unitPriceItem = elements.namedItem("unitPrice")

    const isInputName = nameItem instanceof HTMLInputElement
    const isInputUnitPrice = unitPriceItem instanceof HTMLInputElement

    if (!isInputName || !isInputUnitPrice) return

    const nameValue = nameItem.value.trim()

    const unitPriceValue = Number(unitPriceItem.value)

    if (!nameValue || !unitPriceValue) {
      setEmptyError("Every input is required")
      return
    }

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
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl md:text-6xl font-bold mb-10">{id ? "Edit" : "Add"} Product</h1>
      {!error ? (
        <form className="max-w-[400px] flex flex-col gap-3" action="post" onSubmit={handleSubmit}>
          <div className="w-full flex gap-4 items-center justify-between">
            <label className="font-semibold" htmlFor="name">Name: </label>
            <input className="  bg-neutral-100 dark:bg-neutral-900 rounded py-2 px-3" type="text" name="name" defaultValue={!name ? "" : name}  />
            {loading && (
              <Loader />
            )}
          </div>
          <div className="w-full flex gap-4 items-center justify-between"> 
            <label className="font-semibold" htmlFor="unitPrice">Unit Price {"($)"}: </label>
            <input className=" bg-neutral-100 dark:bg-neutral-900 rounded py-2 px-3" type="number" name="unitPrice" defaultValue={!unitPrice ? "" : unitPrice}/> 
            {loading && (
              <Loader />
            )}
          </div>
          <div>

            <button className="p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-block bg-green-400  dark:bg-green-600  hover:bg-green-500/80 dark:hover:bg-green-600/80 font-semibold w-fit mt-5 cursor-pointer" disabled={loading ? true : false} type="submit">Save & {id ? "Edit" : "Create"} Product</button>
            <p className="text-red-500">{emptyError}</p>
          </div>
        </form>
      ): (
        <p>There has been an error fetch the selected product</p>
      )}
      
    </div>
  )
}
