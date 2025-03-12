import { useState } from "react";
import { todaysDate } from "../utils";
import { newOrderNumber } from "../utils/api";
import AddNewProductButton from "../components/AddNewProductButton";
import { OrderProduct } from "../types";

const finalPrice = 134
const orderNumber = newOrderNumber()

export default function AddOrder() {
  const [products, setProducts] = useState<OrderProduct[]>([])

  //const finalPrice = products.reduce((accumulator, currentValue) => accumulator + (currentValue.unitPrice * currentValue.quantity), 0)
  
  return (
    <div>
      <h1>Add Order</h1>
      <form action="post">
        <h2>Order #: {orderNumber}</h2>
        <div>
          <label htmlFor="date">Date: </label>
          <input type="text" name="date" disabled value={todaysDate()} />
        </div>
        <div>
          <label htmlFor="productsQty">Products: </label>
          <input type="number" name="productsQty" disabled value={products.length} />
        </div>
        <div> 
          <label htmlFor="finalPrice">Final Price: </label>
          <input disabled name="finalPrice" value={finalPrice}/>
        </div>
      </form>
      <AddNewProductButton products={products} setProducts={setProducts} />
    </div>
  )
}
