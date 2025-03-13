import { pool } from '../db.js'

export class ProductModel {
  static async getAll () {
    const connection = await pool.getConnection()
    try {
      const [usuarios] = await connection.query(`
        SELECT * FROM products;
      `)
      if (usuarios.length === 0) throw new Error('There are no products')
      return usuarios
    } catch (error) {
      throw new Error(error)
    } finally {
      connection.release()
    }
  }

  static async getById ({ productId }) {
    const connection = await pool.getConnection()
    try {
      const [product] = await connection.query(`
        SELECT * FROM products WHERE id = ?;
      `, [productId])
      if (product.length === 0) throw new Error(`There are no product with id ${productId}`)
      return product[0]
    } catch (error) {
      throw new Error(error)
    } finally {
      connection.release()
    }
  }

  static async add ({ input }) {
    const connection = await pool.getConnection()
    try {
      const { name, unitPrice } = input

      // verify if exists
      const [productQuery] = await connection.query(`
          SELECT name FROM products WHERE name = ?;
        `, [name])
      if (productQuery.length > 0) throw new Error('Product already registered')

      // register product
      const [result] = await connection.execute(`
        INSERT INTO products (name, unitPrice) VALUES (?, ?)
      `, [name, unitPrice])

      const insertedId = result.insertId

      // obtener el usario registrado desde el uuid creado
      const [rows] = await connection.execute(
        'SELECT * FROM products WHERE id = ?',
        [insertedId]
      )

      const product = rows[0]

      return product
    } catch (error) {
      throw new Error('Error registering product')
    } finally {
      connection.release()
    }
  }

  static async update ({ id, input }) {
    const connection = await pool.getConnection()
    try {
      const { name, unitPrice } = input

      // verify if exists
      const [productQuery] = await connection.query(`
        SELECT name FROM products WHERE id = ?;
      `, [id])
      if (productQuery.length === 0) throw new Error("product doesn't exists")

      // update product
      const [result] = await connection.execute(`
        UPDATE products SET name = ?, unitPrice = ? WHERE id = ?
      `, [name, unitPrice, id])

      if (result.affectedRows > 0) {
        console.log(`Product with ID ${id} updated.`)
      } else {
        console.log('Product not found')
      }

      // Updated product
      const [product] = await connection.query(`
        SELECT * FROM products WHERE id = ?;
      `, [id])

      return product[0]
    } catch (error) {
      console.log(error.message)
      throw new Error('Error updating product')
    } finally {
      connection.release()
    }
  }

  static async delete ({ id }) {
    const connection = await pool.getConnection()
    try {
      // verify if exists
      const [productQuery] = await connection.query(`
        SELECT name FROM products WHERE id = ?;
      `, [id])
      if (productQuery.length === 0) throw new Error("product doesn't exists")

      // delete
      await connection.query(`
        DELETE FROM products WHERE id = ?
      `, id)
    } catch (error) {
      throw new Error(error)
    } finally {
      connection.release()
    }
  }
}
