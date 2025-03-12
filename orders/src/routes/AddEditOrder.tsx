import { useEffect, useState } from "react";
import { todaysDate } from "../utils";
import { createOrder, getOrder, newOrderNumber, updateOrder } from "../utils/api";
import AddNewProductButton from "../components/AddNewProductButton";
import { Order, OrderProduct, OrderToEdit, ProductTableRow } from "../types";
import DeleteButton from "../components/DeleteButton";
import EditOrderProductButton from "../components/EditOrderProductButton";
import { useNavigate, useParams } from "react-router";

const orderNumber = newOrderNumber()

export default function AddEditOrder() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [products, setProducts] = useState<ProductTableRow[]>([])
  const [orderToEdit, setOrderToEdit] = useState<OrderToEdit>()

  useEffect(() => {
    // get the order from the id param

    if (id && !Number.isNaN(id)) {
      const order = getOrder(parseInt(id))
      setOrderToEdit(order.orderInfo)
      setProducts(order.orderProducts)
    }

  }, [id])
  

  const finalPrice = products.reduce((accumulator, currentValue) => accumulator + currentValue.subTotal, 0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const order: Order = {
      orderNumber,
      finalPrice
    } 

    if (id) {
      order.id = orderToEdit?.id
    }

    const orderProducts: OrderProduct[] = products.map(prod => {
      return {
        productId: prod.id,
        quantity: prod.quantity,
        unitPrice: prod.unitPrice,
        subTotal: prod.subTotal,
      }
    })

    if (!id) {
      // Add Order
      createOrder({ order, orderProducts })
    }

    // editOrder
    updateOrder({ order, orderProducts })

    navigate("/my-orders")
  }
  
  return (
    <div>
      <h1>{id ? "Edit Order" : "Add Order"}</h1>
      <form action="post" onSubmit={handleSubmit}>
        <div>
          <h2>Order #: {orderToEdit?.orderNumber ?? orderNumber}</h2>
          <button type="submit">Save & {id ? "Edit Order" : "Create Order"}</button>
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input type="text" name="date" disabled value={orderToEdit?.date ?? todaysDate()} />
        </div>
        <div>
          <label htmlFor="productsQty">Products: </label>
          <input type="number" name="productsQty" disabled value={products.length} />
        </div>
        <div> 
          <label htmlFor="finalPrice">Final Price: </label>
          <input disabled name="finalPrice" value={`$${finalPrice}`}/>
        </div>
      </form>
      <AddNewProductButton setProducts={setProducts} products={products} />
      <section>
        {products.length > 0 ? (
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
              {products.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name) ).map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.unitPrice}</td>
                  <td>{product.quantity}</td>
                  <td>${product.subTotal}</td>
                  <td>
                    <div>
                      <EditOrderProductButton product={product} setProducts={setProducts} products={products} />
                      <DeleteButton onConfirm={() => setProducts(prev => prev.filter(p => product.id !== p.id))} confirmationText="Do you want to delete this product from the order" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Add products to the order</p>
        )}
      </section>
    </div>
  )
}
