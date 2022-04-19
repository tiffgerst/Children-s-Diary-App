import mssql from 'mssql'
import config from '../config/dbConfig.js'
import Jwt from 'jsonwebtoken'

const { connect, query } = mssql

// Finds one user by their ID from the databse
export const getPrompt = async (req, res) => {
  try {
    console.log('booo')
    await connect(config)
    const result =
      await query`select Top 3 prompt from prompts order by NEWID()`
    // console.log(result.recordset)
    // const prompt1 = result.recordset[0]
    // const prompt2 = result.recordset[1].prompt
    // res.status(200).send({
    //   prompt1: prompt1,
    //   prompt2: prompt2,
    // })
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}
