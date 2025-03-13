export class OrderController {
  constructor ({ orderModel }) {
    this.orderModel = orderModel
  }

  getAll = async (req, res) => {
    try {
      const ordersFound = await this.orderModel.getAll()
      return res.json(ordersFound)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    try {
      const orderFound = await this.orderModel.getById(id)
      return res.json(orderFound)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  add = async (req, res) => {
    // { productId: int, quantity: int, unitPrice: int }}
    const { products } = req.body
    try {
      const orderRegistered = await this.orderModel.add(products)
      res.json(orderRegistered)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  updateStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const validStatuses = ['Pending', 'InProgress', 'Completed']
    try {
      // Validate status
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status, it must be one of: ${validStatuses.join(', ')}`)
      }
      const updateResult = await this.orderModel.updateStatus(id, status)
      res.json(updateResult)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    try {
      const orderDelete = await this.orderModel.delete(id)
      return res.json(orderDelete)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  updateOrderProducts = async (req, res) => {
    const { id } = req.params
    const { products } = req.body
    try {
      const orderProductsUpdate = await this.orderModel.updateOrderProducts(id, products)

      return res.json(orderProductsUpdate)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }
}
