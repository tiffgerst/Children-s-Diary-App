import mssql from 'mssql'
import config from '../config/dbConfig.js'


const { connect, query } = mssql

// Finds posts by certain user ID from the databse
export const searchPostByUserID = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result = await query`SELECT * FROM post WHERE userID = ${id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}
