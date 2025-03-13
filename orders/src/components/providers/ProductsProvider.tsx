import React, { useEffect, useState } from 'react'
import { getProducts } from '../../utils/api'
import { Product } from '../../types'
import { ProductsContext } from '../../hooks/useProducts'

export default function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const orders = getProducts()
    setProducts(orders)
  }, [])

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}
