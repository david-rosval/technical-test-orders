import { Link } from "react-router";
import DeleteButton from "../components/DeleteButton";
import ChangeStatus from "../components/ChangeStatus";
import useOrders from "../hooks/useOrders";
import { formatDate } from "../utils";
import { deleteOrder } from "../utils/orders.api";

export default function MyOrders() {
  const { orders, setOrders, loading } = useOrders()

  const ordersRows = orders.map(order => {
    return {
      id: order.orderInfo.id,
      orderNumber: order.orderInfo.orderNumber,
      date: formatDate(order.orderInfo.date),
      productsQty: order.orderProducts.reduce((acc, ordProd) => acc + ordProd.quantity, 0),
      finalPrice: order.orderInfo.finalPrice,
      status: order.orderInfo.status
    } 
  })

  const deleteOrd = async (orderId: number) => {
    try {
      const result = await deleteOrder(orderId)
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
      {!loading ? !ordersRows.length ? (
        <p>Add Orders to display</p>
      ) : (
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
            {ordersRows.sort((a,b) => a.id - b.id).map((order) => (
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
                    <DeleteButton confirmationText="Do you want to delete this order?" onConfirm={() => deleteOrd(order.id)} />
                    <ChangeStatus order={order}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>Loading orders...</p>}
      
    </div>
  )
}
