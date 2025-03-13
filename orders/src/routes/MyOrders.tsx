import { Link } from "react-router";
import DeleteButton from "../components/DeleteButton";
import ChangeStatus from "../components/ChangeStatus";
import useOrders from "../hooks/useOrders";
import { formatDate } from "../utils";
import { deleteOrder } from "../utils/orders.api";
import { ArrowLeft } from "lucide-react";

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
      <Link to={"/"} className="back-button inline-flex items-center gap-3 transition-colors duration-200 ease-in-out text-blue-500 hover:text-blue-600 mb-5">{<ArrowLeft />} Back</Link>
      <h1 className="text-4xl md:text-6xl font-bold mb-10">My Orders</h1>
      <Link to="/add-order" className="p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-block bg-slate-400  dark:bg-slate-800  hover:bg-slate-400/80 dark:hover:bg-slate-800/80">+ New Order</Link>
      {!loading ? !ordersRows.length ? (
        <p>Add Orders to display</p>
      ) : (
        <table className="table-auto block mt-5 border-collapse">
          <thead className="h-12 bg-neutral-200 dark:bg-neutral-900 ">
            <tr>
              <th className="w-10 px-5">Id</th>
              <th className="w-36 px-5">Order #</th>
              <th className="w-36 px-5">Date</th>
              <th className="w-36 px-5"># Products</th>
              <th className="w-36 px-5">Final Price {"($)"}</th>
              <th className="w-fit px-5">Options</th>
            </tr>
          </thead>
          <tbody>
            {ordersRows.sort((a,b) => a.id - b.id).map((order) => (
              <tr key={order.id} className="bg-neutral-100 dark:bg-neutral-800 h-20 border-y border-neutral-100 dark:border-neutral-600">
                <td className="px-5 text-center">{order.id}</td>
                <td className="px-5 text-center">{order.orderNumber}</td>
                <td className="px-5 text-center">{order.date}</td>
                <td className="px-5 text-center">{order.productsQty}</td>
                <td className="px-5 text-center">{order.finalPrice}</td>
                <td className="px-5 ">
                  <div className="flex items-center gap-3">
                    {order.status !== "Completed" && (
                      <Link className="rounded bg-blue-300 dark:bg-blue-500 px-3 py-2 cursor-pointer" to={`/add-order/${order.id}`}>Edit</Link>
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
