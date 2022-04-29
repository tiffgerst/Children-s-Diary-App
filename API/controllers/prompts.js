import mssql from 'mssql'
import config from '../config/dbConfig.js'

const { connect, query } = mssql

// Finds one user by their ID from the databse
export const getPrompt = async (req, res) => {
  try {
    await connect(config)
    const result =
      await query`select Top 3 prompt from prompts order by NEWID()`

    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}
