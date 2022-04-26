import mssql from 'mssql'
import config from '../config/dbConfig.js'

const { connect, query } = mssql

// Get specific avatar
export const getAvatar = async (req, res) => {
  const id = req.params.id
  try {
    await connect(config)
    const result = await query`SELECT avatarURL FROM avatar WHERE avatarID = ${id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}
