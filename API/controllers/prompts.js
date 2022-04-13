import mssql from 'mssql'
import config from '../config/dbConfig.js'
import { compareSync, hashSync } from 'bcrypt'
import Jwt from 'jsonwebtoken'

const { connect, query } = mssql

// Finds one user by their ID from the databse
export const getPrompt = async (req, res) => {
  const num = req.params.num
  try {
    await connect(config)
    const result = await query`SELECT prompt FROM prompts WHERE promptID=${num}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}
