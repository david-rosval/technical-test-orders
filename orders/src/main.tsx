import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import MyOrders from './routes/MyOrders.tsx'
import AddEditOrderLayout from './routes/AddEditOrderLayout.tsx'
import AddEditOrder from './routes/AddEditOrder.tsx'
import OrdersProvider from './components/providers/OrdersProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="my-orders" element={<OrdersProvider><MyOrders /></OrdersProvider>} />
        <Route path="add-order" element={<AddEditOrderLayout />} >
          <Route index element={<AddEditOrder />} />
          <Route path=":id" element={<AddEditOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
