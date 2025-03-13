const generateOrderNumber = async () => {
  const connection = await pool.getConnection()

  try {
    // Obtener el número de órdenes creadas hoy
    const [rows] = await connection.query(`
          SELECT COUNT(*) AS count FROM orders 
          WHERE DATE(date) = CURDATE()
      `)

    const count = rows[0].count + 1 // Incrementar el contador
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '') // Formato YYYYMMDD
    return `${today}${count.toString().padStart(3, '0')}` // Ej: "20240312001"
  } catch (error) {
    console.error('Error generando orderNumber:', error)
    throw error
  } finally {
    connection.release()
  }
}
