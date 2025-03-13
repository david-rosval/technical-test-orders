import React, { useEffect, useState } from 'react'
import { OrdersContext } from '../../hooks/useOrders'
import { FetchedOrder } from '../../types'

export default function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<FetchedOrder[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getAllOrders() {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
        const result = await response.json()

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
