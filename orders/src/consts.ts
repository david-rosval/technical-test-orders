import { Product } from "./types"

export const SAMPLE_ROWS = [
  {
    id: 1,
    orderNumber: 1,
    date: "2025-03-12",
    productsQty: 3,
    finalPrice: 100
  },
  {
    id: 2,
    orderNumber: 2,
    date: "2025-03-13",
    productsQty: 5,
    finalPrice: 200
  },
  {
    id: 3,
    orderNumber: 3,
    date: "2025-03-14",
    productsQty: 2,
    finalPrice: 150
  },
  {
    id: 4,
    orderNumber: 4,
    date: "2025-03-15",
    productsQty: 4,
    finalPrice: 250
  },
  {
    id: 5,
    orderNumber: 5,
    date: "2025-03-16",
    productsQty: 1,
    finalPrice: 50
  }
]

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Chicken",
    unitPrice: 30
  },
  {
    id: 2,
    name: "Cookie",
    unitPrice: 20
  },
  {
    id: 3,
    name: "Orange Juice",
    unitPrice: 50
  }
]