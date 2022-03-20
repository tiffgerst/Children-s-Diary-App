import mssql from 'mssql'
import config from '../config/dbConfig.js'


const { connect, query } = mssql

// Finds images by certain post ID from the databse
export const searchImageByPostID = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result = await query`SELECT * FROM postImageUploaded WHERE postID = ${id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}
