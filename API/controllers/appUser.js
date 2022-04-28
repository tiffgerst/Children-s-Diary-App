import mssql from 'mssql'
import config from '../config/dbConfig.js'
import { compareSync, hashSync } from 'bcrypt'
import Jwt from 'jsonwebtoken'

const { connect, query } = mssql

// Finds one user by their ID from the database
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

export const emailSocialWorker = async (req, res) => {
  const id = req.body.userID
  console.log(id)
  try {
    await connect(config)
    const result =
      await query`SELECT socialWorkerID FROM appUser WHERE UserID = ${id}`
    const sw = result.recordset[0].socialWorkerID
    const final =
      await query`SELECT socialWorkerEmail FROM social_worker WHERE socialWorkerID = ${sw}`
    res.json(final.recordset[0].socialWorkerEmail).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Gets the number of reward stars from the database
export const getStars = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result = await query`SELECT reward FROM appUser WHERE UserID = ${id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Gets whether the user enables the achievements from the database
export const getAchievementStatus = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result =
      await query`SELECT achievementOn FROM appUser WHERE UserID = ${id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Updates user's choice of whether enables achievement or not
export const updateAchievementStatus = async (req, res) => {
  const id = req.params.id
  const choice = req.body.choice
  console.log(id)
  console.log(choice)
  try {
    if (choice) {
      await connect(config)
      const result =
        await query`UPDATE appUser SET achievementOn = 1 WHERE UserID = ${id}`
      res.send(`User:${id} has changed their avatar to 0.`).status(200)
    } else {
      await connect(config)
      const result =
        await query`UPDATE appUser SET achievementOn = 0 WHERE UserID = ${id}`
      res.send(`User:${id} has changed their avatar to 1.`).status(200)
    }
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Updates the avatar of the user
export const updateAvatar = async (req, res) => {
  const id = req.params.id
  const avatar = req.body.avatarID
  console.log(id)
  console.log(avatar)
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

// Handles user login
export const loginUser = async (req, res) => {
  const user = req.body
  const username = user.username
  const passwordHash = user.passwordHash

  try {
    await connect(config)
    const hash =
      await query`SELECT passwordHash, userID FROM appUser WHERE username = ${username}`

    if (hash.rowsAffected == 0) {
      res.status(401).send({
        loginSuccess: false,
        message: 'Incorrect Username',
      })
    } else if (hash.rowsAffected == 1) {
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
          userID: userID,
        })
      } else {
        res.status(401).send({
          loginSuccess: false,
          message: 'Incorrect Password',
        })
      }
    }
  } catch (err) {
    res.status(404).send({
      message: err.message,
    })
  }
}

// Change the password of the user
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
export const isLoggedIn = async (req, res) => {
  console.log('here')
  console.log(req.body)
}

// Finds a user by their email from the databse, for password reset functionality
export const userEmail = async (req, res) => {
  const email = req.params.email

  try {
    await connect(config)
    const result = await query`SELECT * FROM appUser WHERE email = ${email}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Updates User reward point count
export const updateRewardPoints = async (req, res) => {
  const id = req.params.id
  const reward = 5

  try {
    await connect(config)
    const result =
      await query`UPDATE appUser SET reward = reward + ${reward} WHERE UserID = ${id}`
    res.send(`User:${id} has earned ${reward} stars.`).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Updates the display name of the user
export const updateDisplayName = async (req, res) => {
  const id = req.params.id
  const displayName = req.body.displayName

  try {
    await connect(config)
    if (displayName !== '') {
      await query`UPDATE appUser SET displayname = ${displayName} WHERE userID = ${id}`
      res.status(200).send({
        success: true,
      })
      console.log(displayName)
    }
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}
