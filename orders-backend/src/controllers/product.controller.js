export class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel
  }

  getAll = async (req, res) => {
    try {
      const productsFound = await this.productModel.getAll()
      return res.json(productsFound)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    try {
      const productFound = await this.productModel.getById({ productId: id })
      return res.json(productFound)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    try {
      await this.productModel.delete({ id })
      return res.json({ message: 'product deleted' })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  add = async (req, res) => {
    const { product } = req.body // { name, unitPrice }
    try {
      const productRegistered = await this.productModel.add({ input: product })
      return res.json(productRegistered)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  update = async (req, res) => {
    const { id } = req.params
    const { product } = req.body // { name, unitPrice }
    try {
      const updateResult = await this.productModel.update({ id, input: product })
      res.json(updateResult)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
  }
}
