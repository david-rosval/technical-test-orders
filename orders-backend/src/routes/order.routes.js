import { Router } from 'express'
import { OrderController } from '../controllers/order.controller.js'

export const createOrderRouter = ({ orderModel }) => {
  const orderRouter = Router()

  const orderController = new OrderController({ orderModel })

  orderRouter.get('/', orderController.getAll)
  orderRouter.get('/:id', orderController.getById)
  orderRouter.post('/', orderController.add)
  orderRouter.put('/:id/products', orderController.updateOrderProducts)
  orderRouter.patch('/:id/status', orderController.updateStatus)
  orderRouter.delete('/:id', orderController.delete)

  return orderRouter
}
