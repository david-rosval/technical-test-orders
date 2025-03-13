import { useState } from "react"
import { updateOrderStatus } from "../utils/api";

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
  const [statusSelection, setStatusSelection] = useState(order.status)
  
  return (
    <div>
      <select 
        name="status" 
        id="status" 
        value={statusSelection} 
        onChange={e => {
          setStatusSelection(e.target.value)
          updateOrderStatus(order.id, statusSelection as "Completed" | "Pending" | "InProgress")
        }}  
        disabled={statusSelection === "Completed" ? true : false}
      >
        <option value="">--Please choose an option--</option>
        <option value="Pending">Pending</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  )
}
