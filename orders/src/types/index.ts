

export type OrderProduct = {
  id: number
  orderId: number
  productId: number
  quantity: number
  totalPrice: number
}

export type Product = {
  id: number
  name: string
  unitPrice: number
}

export type Order = {
  id: number
  orderNumber: number
  date: string
  finalPrice: number
}