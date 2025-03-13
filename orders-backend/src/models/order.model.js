import { pool } from '../db.js'

export class OrderModel {
  static async getAll () {
    const connection = await pool.getConnection()

    try {
      const [orders] = await connection.query(`
            SELECT id, date, orderNumber, totalPrice AS finalPrice, status 
            FROM orders
        `)

      const [orderProducts] = await connection.query(`
            SELECT 
              op.order_id, 
              op.id, 
              p.name, 
              op.unitPrice, 
              op.quantity, 
              op.subtotal AS subTotal
            FROM order_products op
            JOIN products p ON op.product_id = p.id
        `)

      // formatting data for the frontend
      const ordersMap = new Map()

      orders.forEach(order => {
        ordersMap.set(order.id, {
          orderInfo: {
            id: order.id,
            date: order.date,
            orderNumber: order.orderNumber,
            finalPrice: order.finalPrice,
            status: order.status
          },
          orderProducts: []
        })
      })

      orderProducts.forEach(product => {
        if (ordersMap.has(product.order_id)) {
          ordersMap.get(product.order_id).orderProducts.push({
            id: product.id,
            name: product.name,
            unitPrice: product.unitPrice,
            quantity: product.quantity,
            subTotal: product.subTotal
          })
        }
      })

      return Array.from(ordersMap.values())
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    } finally {
      connection.release()
    }
  }

  static async getById (orderId) {
    const connection = await pool.getConnection()

    try {
      // get order from orders
      const [orderRows] = await connection.query(
        `SELECT id, date, orderNumber, totalPrice AS finalPrice, status 
         FROM orders 
         WHERE id = ?`,
        [orderId]
      )

      if (orderRows.length === 0) {
        return { message: 'Order not found' }
      }

      const orderInfo = orderRows[0]

      // get order products
      const [orderProductsRows] = await connection.query(
        `SELECT 
            op.id, 
            p.name, 
            op.unitPrice, 
            op.quantity, 
            op.subtotal AS subTotal
         FROM order_products op
         JOIN products p ON op.product_id = p.id
         WHERE op.order_id = ?`,
        [orderId]
      )

      // format the result
      const fetchedOrder = {
        orderInfo: {
          id: orderInfo.id,
          date: orderInfo.date,
          orderNumber: orderInfo.orderNumber,
          finalPrice: orderInfo.finalPrice,
          status: orderInfo.status
        },
        orderProducts: orderProductsRows.map(product => ({
          id: product.id,
          name: product.name,
          unitPrice: product.unitPrice,
          quantity: product.quantity,
          subTotal: product.subTotal
        }))
      }

      return fetchedOrder
    } catch (error) {
      console.error('Error fetching order:', error)
      throw error
    } finally {
      connection.release()
    }
  }

  static async updateStatus (orderId, newStatus) {
    const connection = await pool.getConnection()

    try {
      const [result] = await connection.query(
        'UPDATE orders SET status = ? WHERE id = ?',
        [newStatus, orderId]
      )

      if (result.affectedRows === 0) {
        return { message: 'Order not found, or no changes' }
      }

      return { message: `Order with id: ${orderId} updated to: ${newStatus}` }
    } catch (error) {
      console.error('Error updating order:', error)
      throw error
    } finally {
      connection.release()
    }
  }

  static async generateOrderNumberWithDate () {
    const connection = await pool.getConnection()

    try {
      // today's orders count
      const [rows] = await connection.query(`
            SELECT COUNT(*) AS count FROM orders 
            WHERE DATE(date) = CURDATE()
        `)

      const count = rows[0].count + 1
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '') // YYYYMMDD format
      return `${today}${count.toString().padStart(3, '0')}`
    } catch (error) {
      console.error('Error generating orderNumber:', error)
      throw error
    } finally {
      connection.release()
    }
  }

  static async add (products) {
    const connection = await pool.getConnection()
    try {
      const nreOrderNumber = await this.generateOrderNumberWithDate()
      // Insert new order
      const [orderResult] = await connection.query(
        'INSERT INTO orders (orderNumber) VALUES (?)',
        [nreOrderNumber]
      )
      const orderId = orderResult.insertId // get the id

      // insert order_products
      const orderProductsData = products.map(({ productId, quantity, unitPrice }) => [
        orderId, productId, quantity, unitPrice
      ])

      await connection.query(
        'INSERT INTO order_products (order_id, product_id, quantity, unitPrice) VALUES ?',
        [orderProductsData]
      )

      // set the totalPrice
      const [[{ totalPrice }]] = await connection.query(
        'SELECT SUM(subtotal) AS totalPrice FROM order_products WHERE order_id = ?',
        [orderId]
      )

      await connection.query(
        'UPDATE orders SET totalPrice = ? WHERE id = ?',
        [totalPrice, orderId]
      )

      await connection.commit()

      return { message: 'Order successfully created', orderId, totalPrice }
    } catch (error) {
      await connection.rollback()
      console.error('Error creating order:', error)
      throw error
    } finally {
      connection.release()
    }
  }

  static async delete (orderId) {
    const connection = await pool.getConnection()

    try {
      // Delete the order
      const [result] = await connection.query(
        'DELETE FROM orders WHERE id = ?',
        [orderId]
      )

      if (result.affectedRows === 0) {
        return { message: 'Order not found' }
      }

      await connection.commit()
      return { message: `Order with id:${orderId} successfully deleted` }
    } catch (error) {
      await connection.rollback()
      console.error('Error deleting the order:', error)
      throw error
    } finally {
      connection.release()
    }
  }

  static async updateOrderProducts (orderId, products) {
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      // Delete previous order_products
      await connection.query('DELETE FROM order_products WHERE order_id = ?', [orderId])

      // insert modified order_products
      if (products.length > 0) {
        const orderProductsData = products.map(({ productId, quantity, unitPrice }) => [
          orderId, productId, quantity, unitPrice
        ])

        await connection.query(
          'INSERT INTO order_products (order_id, product_id, quantity, unitPrice) VALUES ?',
          [orderProductsData]
        )
      }

      // calculate new total price
      const [[{ totalPrice }]] = await connection.query(
        'SELECT COALESCE(SUM(subtotal), 0) AS totalPrice FROM order_products WHERE order_id = ?',
        [orderId]
      )

      // update order total price
      await connection.query(
        'UPDATE orders SET totalPrice = ? WHERE id = ?',
        [totalPrice, orderId]
      )

      await connection.commit()
      return { message: 'Order Products successfully updated', orderId, totalPrice }
    } catch (error) {
      await connection.rollback()
      console.error('Error updating Order Products:', error)
      throw error
    } finally {
      connection.release()
    }
  };
}
