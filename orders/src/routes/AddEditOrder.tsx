import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AddNewProductButton from "../components/AddNewProductButton";
import DeleteButton from "../components/DeleteButton";
import EditOrderProductButton from "../components/EditOrderProductButton";
import ProductsProvider from "../components/providers/ProductsProvider";
import { InsertOrderBody, OrderToEdit, ProductTableRow } from "../types";
import { formatDate, todaysDate } from "../utils";
import { createOrder, getOrder, updateOrderProducts } from "../utils/api";


export default function AddEditOrder() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [orderProducts, setOrderProducts] = useState<ProductTableRow[]>([])
  const [orderToEdit, setOrderToEdit] = useState<OrderToEdit>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

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
      }
    }

  }
  
  return (
    <ProductsProvider>
      <div>
        <h1>{id ? "Edit Order" : "Add Order"}</h1>
        <form action="post" onSubmit={handleSubmit}>
          <div>
            <h2>Order #{orderToEdit?.orderNumber ?? "..."}</h2>
            <button type="submit">Save & {id ? "Edit Order" : "Create Order"}</button>
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input type="text" name="date" disabled value={!orderToEdit ? todaysDate() : formatDate(orderToEdit.date)} />
          </div>
          <div>
            <label htmlFor="productsQty">Products count: </label>
            <input type="number" name="productsQty" disabled value={orderProducts.reduce((acc, orderProduct) => acc + orderProduct.quantity, 0)} />
          </div>
          <div> 
            <label htmlFor="finalPrice">Final Price {"($)"}: </label>
            <input disabled name="finalPrice" value={orderProducts.reduce((acc, orderProduct) => acc + Number(orderProduct.subTotal), 0)}/>
          </div>
        </form>

          <AddNewProductButton setOrderProducts={setOrderProducts} orderProducts={orderProducts} /> {/* PRODUCTS FETCHED FROM THE API */}

        <section>
          {!error 
            ? loading
              ? <p>Loading order products...</p>
              : (
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Sub Total</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderProducts.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name) ).map(orderProduct => (
                      <tr key={orderProduct.productId}>
                        <td>{orderProduct.productId}</td>
                        <td>{orderProduct.name}</td>
                        <td>${orderProduct.unitPrice}</td>
                        <td>{orderProduct.quantity}</td>
                        <td>${Number(orderProduct.subTotal)}</td>
                        <td>
                          <div>
                            <EditOrderProductButton orderProduct={orderProduct} setOrderProducts={setOrderProducts} orderProducts={orderProducts} />
                            <DeleteButton onConfirm={() => setOrderProducts(prev => prev.filter(p => orderProduct.productId !== p.productId))} confirmationText="Do you want to delete this product from the order" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            : <p>Error fetching order products.</p>}
          
        </section>
      </div>
    </ProductsProvider>

  )
}
