import mssql from 'mssql'
import config from '../config/dbConfig.js'


const { connect, query } = mssql

// Finds a post by its post ID from the databse
export const searchPost = async (req, res) => {
  const post_id = req.params.post_id

  try {
    await connect(config)
    const result = await query`SELECT * FROM post WHERE postID = ${post_id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}