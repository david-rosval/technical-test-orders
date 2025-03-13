
import './App.css'
import { Link } from 'react-router'

function App() {

  return (
    <div>
      <h1>Order Management</h1>
      <div>
        <Link to={"/my-orders"}>My Orders</Link>
      </div>
      
      <div>
        <Link to={"/products"}>Products</Link>
      </div>
    </div>
  )
}

export default App
