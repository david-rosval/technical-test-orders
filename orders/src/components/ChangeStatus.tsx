import { useState } from "react"
import { Status, UpdateOrderStatusBody } from "../types";
import useOrders from "../hooks/useOrders";
import { updateOrderStatus } from "../utils/orders.api";
import { Loader } from "lucide-react";

export default function ChangeStatus({
  order
}: {
  order: {
    id: number;
    orderNumber: number;
    date: string;
    productsQty: number;
    finalPrice: number;
    status: "Completed" | "Pending" | "InProgress" | undefined | string
  }
}) {
  const { setOrders } = useOrders()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)  
  const [statusSelection, setStatusSelection] = useState(order.status)

  const changeStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusSelection(e.target.value)

    const patchStatus: UpdateOrderStatusBody = { status: e.target.value as Status }
    setLoading(true)
    
    try {
      
      const result = await updateOrderStatus(order.id, patchStatus)
      console.log(result)

      // optimistic
      setOrders(prev => {
        const orderFound = prev.find(ord => ord.orderInfo.id === order.id)
        if (!orderFound) return prev
        orderFound.orderInfo.status = e.target.value as Status

        return [...(prev.filter(ord => ord.orderInfo.id !== order.id)), orderFound]
      })
      
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
        setStatusSelection(order.status)
      }
      console.log(e)
    } finally {
      setLoading(false)
    }
    
  }
  
  return (
    <div className="flex items-center gap-2 relative">
      <select 
        name="status" 
        id="status" 
        value={statusSelection} 
        onChange={changeStatus}  
        disabled={statusSelection === "Completed" ? true : loading ? true : false}
        className="bg-neutral-100 dark:bg-neutral-700 rounded py-2 px-3 w-36 disabled:text-neutral-50/30"
       
      >
        <option className="text-neutral-900 dark:text-white" value="">--Please choose an option--</option> 
        <option className="text-neutral-900 dark:text-white" value="Pending">Pending</option>
        <option className="text-neutral-900 dark:text-white" value="InProgress">In Progress</option>
        <option className="text-neutral-900 dark:text-white" value="Completed">Completed</option>
      </select>
      <p style={{
        display: !error ? "none" : "block" 
      }}>{error}</p>
      <Loader style={{
        display: !loading ? "none" : "block" 
      }} className="animate-spin absolute left-[110%]" />
    </div>
  )
}
