import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import MyOrders from './routes/MyOrders.tsx'
import AddEditOrderLayout from './routes/AddEditOrderLayout.tsx'
import AddOrder from './routes/AddOrder.tsx'
import EditOrder from './routes/EditOrder.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="add-order" element={<AddEditOrderLayout />} >
          <Route index element={<AddOrder />} />
          <Route path=":id" element={<EditOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
