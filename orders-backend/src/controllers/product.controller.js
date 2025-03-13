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
}
