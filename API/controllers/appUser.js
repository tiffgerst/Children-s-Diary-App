import mssql from 'mssql'
import config from '../config/dbConfig.js'
import { compareSync, hashSync } from 'bcrypt'
import Jwt from 'jsonwebtoken'

const { connect, query } = mssql

// Finds one user by their ID from the databse
export const singleUser = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result = await query`SELECT * FROM appUser WHERE UserID = ${id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Updates User pincode
export const updateUser = async (req, res) => {
  const id = req.params.id
  const avatar = req.body.avatarID

  try {
    await connect(config)
    const result =
      await query`UPDATE appUser SET avatarID = ${avatar} WHERE UserID = ${id}`
    res.send(`User:${id} has changed their avatar to  ${avatar}.`).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Adds user to database
export const registerUser = async (req, res) => {
  const user = req.body
  const username = user.username
  const passwordHash = hashSync(user.passwordHash, 10)

  try {
    await connect(config)
    const result =
      await query`Select * from appUser WHERE username = ${username}`
    if (result.recordset.length == 0) {
      await query`INSERT INTO appUser(username,passwordHash) VALUES (${username},${passwordHash})`
      res.status(200).send({
        success: true,
        message: 'user successfully added',
        username: username,
      })
    } else {
      res.status(409).send({
        success: false,
        message: 'Username is already taken',
      })
    }
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}

// Deletes a user by their userID
export const deleteUser = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result = await query`DELETE FROM appUser WHERE UserID = ${id}`
    res.send(`Deleted user: ${id} from the database.`).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

export const loginUser = async (req, res) => {
  const user = req.body
  const username = user.username
  const passwordHash = user.passwordHash

  try {
    await connect(config)
    const hash =
      await query`SELECT passwordHash, userID FROM appUser WHERE username = ${username}`
    const pass = hash.recordset[0].passwordHash
    const userID = hash.recordset[0].userID
    if (compareSync(passwordHash, pass)) {
      const payload = {
        username: user.username,
        userID: userID,
      }

      const token = Jwt.sign(payload, 'XYZ', { expiresIn: '1d' })

      res.status(200).send({
        loginSuccess: true,
        message: 'logged in',
        token: 'Bearer ' + token,
      })
    } else {
      res.status(401).send({
        loginSuccess: false,
        message: 'login in failed',
      })
    }
  } catch (err) {
    res.status(404).send({
      message: err.message,
    })
  }
}

export const changePassword = async (req, res) => {
  const user = req.body
  const username = user.username
  const passwordHash = user.passwordHash
  const newpassword = hashSync(user.newpassword, 10)
  try {
    await connect(config)
    const hash =
      await query`SELECT passwordHash FROM appUser WHERE username = ${username}`
    const pass = hash.recordset[0].passwordHash
    if (compareSync(passwordHash, pass)) {
      await query`UPDATE appUser SET passwordHash = ${newpassword} WHERE username = ${username}`
    } else {
      res.status(401).send({
        loginSuccess: false,
        message: 'Wrong password. Password change failed.',
        user: {
          username: username,
        },
      })
    }
  } catch (err) {
    res.status(404).send({
      message: err.message,
    })
  }
}
