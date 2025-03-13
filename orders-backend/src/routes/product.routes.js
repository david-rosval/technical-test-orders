import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })

  productRouter.get('/', productController.getAll)

  return productRouter
}
