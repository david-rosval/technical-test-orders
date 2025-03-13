import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import MyOrders from './routes/MyOrders.tsx'
import AddEditOrderLayout from './routes/AddEditOrderLayout.tsx'
import AddEditOrder from './routes/AddEditOrder.tsx'
import OrdersProvider from './components/providers/OrdersProvider.tsx'
import ProductsProvider from './components/providers/ProductsProvider.tsx'
import Products from './routes/Products.tsx'
import AddEditProduct from './routes/AddEditProduct.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route index element={<App />} />

        <Route path="my-orders" element={<OrdersProvider><MyOrders /></OrdersProvider>} />

        <Route path="add-order" element={<AddEditOrderLayout to='/my-orders' />} >
          <Route index element={<AddEditOrder />} />
          <Route path=":id" element={<AddEditOrder />} />
        </Route>
        
        <Route path="products" element={<ProductsProvider><Products /></ProductsProvider>} />

        <Route path="add-product" element={<AddEditOrderLayout to='/products' />} >
          <Route index element={<AddEditProduct />} />
          <Route path=":id" element={<AddEditProduct />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
