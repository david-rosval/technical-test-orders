import { Link } from "react-router";
import { SAMPLE_ROWS } from "../consts";
import DeleteButton from "../components/DeleteButton";

export default function MyOrders() {
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
          {SAMPLE_ROWS.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.productsQty}</td>
              <td>{order.finalPrice}</td>
              <td>
                <div>
                  <Link to={`/add-order/${order.id}`}>Edit</Link>
                  <DeleteButton />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
