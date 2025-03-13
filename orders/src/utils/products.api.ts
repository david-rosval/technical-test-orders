import { VITE_API_URL } from "../config";
import { InsertProductBody } from "../types";


export async function getProducts() {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products`)
    const result = await response.json()

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function createProduct(newProduct: InsertProductBody) {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(newProduct)
    })
    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function updateProduct(productId: string | undefined, newUpdatedProduct: InsertProductBody) {
  console.log(`Updating producst of Product with id ${productId}`)
  try {
    const response = await fetch(`${VITE_API_URL}/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(newUpdatedProduct)
    })
    const result = await response.json()
    return result
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
  
}



export async function getProduct(id: string | undefined) {
  console.log(`obtaninig Product with id: ${id}`)

  try {
    const response = await fetch(`${VITE_API_URL}/api/products/${id}`)
    const result = await response.json()
    return result
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}


export async function deleteProduct(productId: number | undefined) {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products/${productId}`, { method: "DELETE" })
    const result = await response.json()
    return result
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}