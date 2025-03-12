import { Link } from "react-router";
import DeleteButton from "../components/DeleteButton";
import { useEffect, useState } from "react";
import { getOrders } from "../utils/api";
import { OrderRow } from "../types";

export default function MyOrders() {
  const [ordersRows, setOrdersRows] = useState<OrderRow[]>([])

  useEffect(() => {
    const orders = getOrders()
    const ordersFormatted = orders.map(order => {
      return {
        id: order.orderInfo.id,
        orderNumber: order.orderInfo.orderNumber,
        date: order.orderInfo.date,
        productsQty: order.orderProducts.length,
        finalPrice: order.orderInfo.finalPrice,
      } 
    })
    setOrdersRows(ordersFormatted)
  }, [])
  

  return (
    <div>
      <h1>My Orders</h1>
      <Link to="/add-order">+ New Order</Link>
      <table>
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
                  <Link to={`/add-order/${order.id}`}>Edit</Link>
                  <DeleteButton confirmationText="Do you want to delete this order?" onConfirm={() => console.log("delete order")} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
