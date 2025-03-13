import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AddNewProductButton from "../components/AddNewProductButton";
import DeleteButton from "../components/DeleteButton";
import EditOrderProductButton from "../components/EditOrderProductButton";
import ProductsProvider from "../components/providers/ProductsProvider";
import { InsertOrderBody, OrderToEdit, ProductTableRow } from "../types";
import { formatDate, todaysDate } from "../utils";
import { createOrder, getOrder, updateOrderProducts } from "../utils/orders.api";
import LoaderComponent from "../components/LoaderComponent";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmButton from "../components/ConfirmButton";


export default function AddEditOrder() {
  const navigate = useNavigate();
  const { id } = useParams()

  const [orderProducts, setOrderProducts] = useState<ProductTableRow[]>([]) // stores the fetched values
  const [orderToEdit, setOrderToEdit] = useState<OrderToEdit>() // stores the fetched values

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [emptyError, setEmptyError] = useState<string | null>(null)

  const [mutationLoading, setMutationLoading] = useState(false)
  const [mutationError, setMutationError] = useState<string | null>(null)

  useEffect(() => {
    async function getOrderById() {
      setLoading(true)
      try {
        const result = await getOrder(id)

        setOrderToEdit(result.orderInfo)
        setOrderProducts(result.orderProducts)

        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false)
          setError(error.message)
        }
      }
    }
    if (id && !Number.isNaN(id)) {
      getOrderById()
    }
  }, [id])
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setMutationLoading(true)

    setEmptyError(null)

    setMutationError(null)

    if (!orderProducts.length) {
      setEmptyError(`Select products for the order before ${id ? "updating" : "creating"} it`)
      setMutationLoading(false)
      return
    }

    const newOrderProducts: InsertOrderBody = {
      products: orderProducts.map(orderProduct => {
        return {
          productId: orderProduct.productId as number,
          quantity: orderProduct.quantity,
          unitPrice: orderProduct.unitPrice
        }
      })
    }

    if (!id) {
      // Add Order
      try {
        const result = await createOrder(newOrderProducts)
        console.log(result)
        navigate("/my-orders")
      } catch (error) {
        console.log(error)
        setMutationError("Error creating the order")
      } finally {
        setMutationLoading(false)
      }
    } else {
      // editOrder
      console.log("edit order")
      try {
        const result = await updateOrderProducts(id, newOrderProducts)
        console.log(result)
        navigate("/my-orders")
      } catch (error) {
        console.log(error)
        setMutationError("Error updating the order")
      } finally {
        setMutationLoading(false)
      }
    }

  }
  
  return (
    <ProductsProvider>
      <div className="">
        <h1 className="text-4xl md:text-6xl font-bold mb-10">{id ? "Edit Order" : "Add Order"}</h1>
        <form action="post" onSubmit={handleSubmit} className="flex flex-col gap-3 lg:max-w-[700px]">
          <div className="flex flex-col md:flex-row w-full justify-between items-start mb-6 relative">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">Order #{orderToEdit?.orderNumber ?? "..."}</h2>
            <ConfirmButton condition={mutationLoading}>
              Save & {id ? "Edit Order" : "Create Order"}
              {mutationLoading && (
                <div className="absolute left-[102%]">
                  <LoaderComponent />
                </div>
              )} 
            </ConfirmButton>
            {mutationError && <div className="absolute left-0 top-full md:right-0 md:left-auto"><ErrorMessage>{mutationError}</ErrorMessage></div>}
          </div>
          
          <div className="flex justify-between">
            <label className="font-semibold" htmlFor="date">Date: </label>
            <input className="text-lg text-right w-fit" type="text" name="date" disabled value={!orderToEdit ? todaysDate() : formatDate(orderToEdit.date)} />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold" htmlFor="productsQty">Products count: </label>
            <input className="text-lg text-right w-fit" type="text" name="productsQty" disabled value={orderProducts.reduce((acc, orderProduct) => acc + orderProduct.quantity, 0)} />
          </div>
          <div className="flex justify-between"> 
            <label className="font-semibold" htmlFor="finalPrice">Final Price {"($)"}: </label>
            <input className="text-lg text-right w-fit" disabled name="finalPrice" value={orderProducts.reduce((acc, orderProduct) => acc + Number(orderProduct.subTotal), 0)}/>
          </div>
        </form>
        {emptyError && (
            <ErrorMessage>{emptyError}</ErrorMessage>
          )}
        <AddNewProductButton setOrderProducts={setOrderProducts} orderProducts={orderProducts} /> {/* PRODUCTS FETCHED FROM THE API */}

        <section>
          {!error 
            ? loading
              ? <LoaderComponent text="Loading order details" />
              : orderProducts.length > 0
                ? (
                  <div className="overflow-x-auto">
                    <table className="table-auto block mt-5 border-collapse">
                      <thead className="h-12 bg-neutral-200 dark:bg-neutral-900 ">
                        <tr className="text-base">
                          <th className="min-w-10 px-5">Id</th>
                          <th className="min-w-36 px-5">Name</th>
                          <th className="min-w-32 px-5">Unit Price</th>
                          <th className="min-w-10 px-5">Quantity</th>
                          <th className="min-w-28 px-5">Sub Total</th>
                          <th className="min-w-fit px-5">Options</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {orderProducts.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name) ).map(orderProduct => (
                          <tr key={orderProduct.productId} className="bg-neutral-100 dark:bg-neutral-800 h-20 border-y border-neutral-100 dark:border-neutral-600" >
                            <td className="px-5 text-center">{orderProduct.productId}</td>
                            <td className="px-5 text-center">{orderProduct.name}</td>
                            <td className="px-5 text-center">${orderProduct.unitPrice}</td>
                            <td className="px-5 text-center">{orderProduct.quantity}</td>
                            <td className="px-5 text-center">${Number(orderProduct.subTotal)}</td>
                            <td className="px-5">
                              <div className="flex items-center gap-3">
                                <EditOrderProductButton orderProduct={orderProduct} setOrderProducts={setOrderProducts} orderProducts={orderProducts} />
                                <DeleteButton onConfirm={() => setOrderProducts(prev => prev.filter(p => orderProduct.productId !== p.productId))} confirmationText="Do you want to delete this product from the order" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                )
                : <p>Add Products to the order</p>
            : <p>Error fetching order products.</p>}
        </section>
      </div>
    </ProductsProvider>

  )
}
