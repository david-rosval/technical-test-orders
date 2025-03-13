import React, { useEffect, useState } from 'react'
import { Product } from '../../types'
import { ProductsContext } from '../../hooks/useProducts'
import { getProducts } from '../../utils/api'

export default function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    async function getAllProducts() {
      setLoading(true)
      try {
        const result = await getProducts()

        setProducts(result)
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false)
          setError(error.message)
        }
      }
    }
    getAllProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ products, setProducts, loading, error }}>
      {children}
    </ProductsContext.Provider>
  )
}
