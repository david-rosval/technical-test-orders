import { useNavigate, useParams } from "react-router"
import { createProduct, getProduct, updateProduct } from "../utils/products.api"
import { useEffect, useState } from "react";
import LoaderComponent from "../components/LoaderComponent";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmButton from "../components/ConfirmButton";

export default function AddEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>("")
  const [unitPrice, setUnitPrice] = useState<number>(0)
  const [emptyError, setEmptyError] = useState<string | null>(null)
  const [mutationLoading, setMutationLoading] = useState(false)
  const [mutationError, setMutationError] = useState<string | null>(null)

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

    setMutationLoading(true)

    setMutationError(null)
    
    setEmptyError(null)

    // GET FORM VALUES --------------------------

    const { elements } = event.currentTarget

    
    const nameItem = elements.namedItem("name")
    const unitPriceItem = elements.namedItem("unitPrice")

    const isInputName = nameItem instanceof HTMLInputElement
    const isInputUnitPrice = unitPriceItem instanceof HTMLInputElement

    if (!isInputName || !isInputUnitPrice) {
      setMutationLoading(false)
      setMutationError("Error retrieving input values")
      return
    }

    const nameValue = nameItem.value.trim()

    const unitPriceValue = Number(unitPriceItem.value)

    if (!nameValue || !unitPriceValue) {
      setEmptyError("Every input is required")
      setMutationLoading(false)
      return
    }

    // -------------------------------------------

    if (!id) {
      // Add Product
      try {
        const result = await createProduct({ product: { name: nameValue, unitPrice: unitPriceValue }})
        console.log(result)
        navigate("/products")
        
      } catch (error) {
        console.log(error)
        setMutationError("Error creating product")
      } finally {
        setMutationLoading(false)
      }
    } else {
      // Edit Product
      try {
        const result = await updateProduct(id, { product: { name: nameValue, unitPrice: unitPriceValue }})
        console.log(result)
        navigate("/products")
        
      } catch (error) {
        console.log(error)
        setMutationError("Error updating product")
      } finally {
        setMutationLoading(false)
      }
    }

    
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl md:text-6xl font-bold mb-10">{id ? "Edit" : "Add"} Product</h1>
      {!error ? (
        <form className="max-w-[400px] flex flex-col gap-3" action="post" onSubmit={handleSubmit}>
          <div className="w-full flex gap-4 items-center justify-between relative">
            <label className="font-semibold" htmlFor="name">Name: </label>
            <input className="  bg-neutral-100 dark:bg-neutral-900 rounded py-2 px-3" type="text" name="name" defaultValue={!name ? "" : name}  />
            {loading && (
              <Loading />
            )}
          </div>
          <div className="w-full flex gap-4 items-center justify-between relative"> 
            <label className="font-semibold" htmlFor="unitPrice">Unit Price {"($)"}: </label>
            <input className=" bg-neutral-100 dark:bg-neutral-900 rounded py-2 px-3" type="number" name="unitPrice" defaultValue={!unitPrice ? "" : unitPrice}/> 
            {loading && (
              <Loading />
            )}
          </div>
          <div>
            <ConfirmButton condition={loading || mutationLoading}>
              Save & {id ? "Edit" : "Create"} Product
              {mutationLoading && (
                <div className="absolute left-[105%]">
                  <LoaderComponent />
                </div>
              )}
            </ConfirmButton>
            
            {emptyError && (
              <ErrorMessage>{emptyError}</ErrorMessage>
            )}
            {mutationError && (
              <ErrorMessage>{mutationError}</ErrorMessage>
            )}
          </div>
        </form>
      ): (
        <p>There has been an error fetch the selected product</p>
      )}
      
    </div>
  )
}


const Loading = () => {
  return (
    <div className="absolute left-[105%]">
      <LoaderComponent />
    </div>
  )
}