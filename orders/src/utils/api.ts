import { SAMPLE_ORDER, SAMPLE_ORDERS, SAMPLE_PRODUCTS } from "../consts";
import { Order, OrderProduct } from "../types";

export function newOrderNumber() {
  return SAMPLE_ORDERS.length + 1
}

export function createOrder({ 
  order, 
  orderProducts 
}: { 
  order: Order, 
  orderProducts: OrderProduct[] 
}) {
  console.log("order", order)
  console.log("orderProducts", orderProducts)
}

export function updateOrder({ 
  order, 
  orderProducts 
}: { 
  order: Order, 
  orderProducts: OrderProduct[] 
}) {
  console.log("order id to edit", order.id)
  console.log("orderProducts", orderProducts)
}

export function updateOrderStatus(orderId: number, newStatus: "Pending" | "InProgress" | "Completed"){
  console.log(`Updating the status to ${newStatus} of the order with id: ${orderId}`)
}

export function getOrder(id: number) {
  console.log(`obtaninig order with id: ${id}`)
  return SAMPLE_ORDER
}

export function getProducts() {
  return SAMPLE_PRODUCTS
}

export function getOrders() {
  return SAMPLE_ORDERS
}