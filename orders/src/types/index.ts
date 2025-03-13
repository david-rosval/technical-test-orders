export type Status = "Pending" | "InProgress" | "Completed"

export type OrderProduct = {
  id?: number // Auto
  orderId?: number // then
  productId: number
  quantity: number
  unitPrice: number
  subTotal: number
}

export type FetchedOrder = {
  orderInfo: {
    id: number,
    date: string,
    orderNumber: number,
    finalPrice: number,
    status?: Status
  },
  orderProducts: {
    id: number,
    name:string ,
    unitPrice: number,
    quantity: number,
    subTotal: number
  }[]
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
  status?: Status
}

export type OrderToEdit= {
  id: number ,
  date: string,
  orderNumber: number,
  finalPrice: number,
  status?: Status

}

export type OrderRow = {
  id: number,
  orderNumber: number,
  date: string,
  productsQty: number,
  finalPrice: number,
  status?: Status

}

export type ProductTableRow = {
  id?: number // Auto
  productId?: number
  name: string
  unitPrice: number
  quantity: number
  subTotal: number
}

export type InsertOrderBody = {
  products: {
    productId: number
    quantity: number
    unitPrice: number
  }[]
}

export type UpdateOrderStatusBody = {
  status: Status
}

export type InsertProductBody = {
  product: {
    name: string,
    unitPrice: number
  }
}