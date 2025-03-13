import { createContext, useContext } from "react"
import { Product } from "../types"

export type ProductsContextType = {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  loading: boolean,
  error: string | null
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export default function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error("You must use useProducts inside an ProductsProvider")
  }
  return context
}