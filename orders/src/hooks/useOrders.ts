import { createContext, useContext } from "react"
import { FetchedOrder } from "../types"

export type OrdersContextType = {
  orders: FetchedOrder[],
  setOrders: React.Dispatch<React.SetStateAction<FetchedOrder[]>>,
  loading: boolean,
  error: string | null
}

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export default function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("You must use useOrders inside an OrdersProvider")
  }
  return context
}