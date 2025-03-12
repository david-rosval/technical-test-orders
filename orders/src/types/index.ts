

export type OrderProduct = {
  id?: number // Auto
  orderId?: number // then
  productId: number
  quantity: number
  unitPrice: number
  subTotal: number
}

export type Product = {
  id?: number // Auto
  name: string
  unitPrice: number
}

export type Order = {
  id?: number // Auto
  date?: string // Auto
  orderNumber: number
  finalPrice?: number 
}

export type OrderToEdit= {
  id: number ,
  date: string,
  orderNumber: number,
  finalPrice: number,
}

export type OrderRow = {
  id: number,
  orderNumber: number,
  date: string,
  productsQty: number,
  finalPrice: number,
}

export type ProductTableRow = {
  id: number // Auto
  name: string
  unitPrice: number
  quantity: number
  subTotal: number
}