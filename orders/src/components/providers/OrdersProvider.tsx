import React, { useEffect, useState } from 'react'
import { OrdersContext } from '../../hooks/useOrders'
import { getOrders } from '../../utils/api'
import { FetchedOrder } from '../../types'

export default function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<FetchedOrder[]>([])
  useEffect(() => {
    const orders = getOrders()
    setOrders(orders)
  }, [])

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}
