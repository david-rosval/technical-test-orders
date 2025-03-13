import { Link } from "react-router";
import DeleteButton from "../components/DeleteButton";
import ChangeStatus from "../components/ChangeStatus";
import useOrders from "../hooks/useOrders";
import { formatDate } from "../utils";

export default function MyOrders() {
  const { orders, setOrders } = useOrders()

  const ordersRows = orders.map(order => {
    return {
      id: order.orderInfo.id,
      orderNumber: order.orderInfo.orderNumber,
      date: formatDate(order.orderInfo.date),
      productsQty: order.orderProducts.length,
      finalPrice: order.orderInfo.finalPrice,
      status: order.orderInfo.status
    } 
  })

  const deleteOrder = async (orderId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, { method: "DELETE" })
      const result = await response.json()
      console.log(result)
      
      setOrders(prev => prev.filter(order => order.orderInfo.id !== orderId))
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>My Orders</h1>
      <Link to="/add-order">+ New Order</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Order #</th>
            <th>Date</th>
            <th># Products</th>
            <th>Final Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {ordersRows.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.productsQty}</td>
              <td>{order.finalPrice}</td>
              <td>
                <div>
                  {order.status !== "Completed" && (
                    <Link className="edit-button" to={`/add-order/${order.id}`}>Edit</Link>
                  )}
                  <DeleteButton confirmationText="Do you want to delete this order?" onConfirm={() => deleteOrder(order.id)} />
                  <ChangeStatus order={order}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
