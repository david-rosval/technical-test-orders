import express from 'express'
import cors from 'cors'
import { createProductRouter } from './routes/product.routes.js'
import { ProductModel } from './models/product.model.js'
import { createOrderRouter } from './routes/order.routes.js'
import { OrderModel } from './models/order.model.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Technical test orders backend')
})

const productModel = ProductModel
const orderModel = OrderModel

app.use('/api/products', createProductRouter({ productModel }))
app.use('/api/orders', createOrderRouter({ orderModel }))

export default app
