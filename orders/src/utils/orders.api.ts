import { VITE_API_URL } from "../config";
import { InsertOrderBody, UpdateOrderStatusBody } from "../types";

export async function getOrders() {
  try {
    const response = await fetch(`${VITE_API_URL}/api/orders`)
    const result = await response.json()

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}



export async function createOrder(orderProducts: InsertOrderBody) {
  try {
    const response = await fetch(`${VITE_API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(orderProducts)
    })
    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function updateOrderProducts(orderId: string | undefined, orderProducts: InsertOrderBody) {
  console.log(`Updating producst of order with id ${orderId}`)
  try {
    const response = await fetch(`${VITE_API_URL}/api/orders/${orderId}/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(orderProducts)
    })
    const result = await response.json()
    return result
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
  
}

export async function updateOrderStatus(orderId: number, patchStatus: UpdateOrderStatusBody){
  console.log(`Updating the status to ${patchStatus} of the order with id: ${orderId}`)
  try {
    const response = await fetch(`${VITE_API_URL}/api/orders/${orderId}/status`, {
      method: "PATCH", 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchStatus)
    })
    const result = await response.json()
    return result
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function getOrder(id: string | undefined) {
  console.log(`obtaninig order with id: ${id}`)

  try {
    const response = await fetch(`${VITE_API_URL}/api/orders/${id}`)
    const result = await response.json()
    return result
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}


export async function deleteOrder(orderId: number) {
  try {
    const response = await fetch(`${VITE_API_URL}/api/orders/${orderId}`, { method: "DELETE" })
    const result = await response.json()
    return result
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}