import React, { useEffect, useState } from 'react'
import { OrdersContext } from '../../hooks/useOrders'
import { FetchedOrder } from '../../types'
import { getOrders } from '../../utils/orders.api'

export default function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<FetchedOrder[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getAllOrders() {
      setLoading(true)
      try {
        const result = await getOrders()

        setOrders(result)
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false)
          setError(error.message)
        }
      }
    }
    getAllOrders()
  }, [])

  return (
    <OrdersContext.Provider value={{ orders, setOrders, loading, error }}>
      {children}
    </OrdersContext.Provider>
  )
}
