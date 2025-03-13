import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })

  productRouter.get('/', productController.getAll)
  productRouter.get('/:id', productController.getById)
  productRouter.post('/', productController.add)
  productRouter.delete('/:id', productController.delete)
  productRouter.put('/:id', productController.update)

  return productRouter
}
