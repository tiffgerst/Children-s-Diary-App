import express from 'express'
import {
  singleUser,
  updateUser,
  registerUser,
  deleteUser,
  loginUser,
  changePassword,
  isLoggedIn,
} from '../controllers/appUser.js'
import passport from 'passport'
import '../config/passport.js'

const router = express.Router()
router.get('/getUser/:id', singleUser)
router.patch('/:id', updateUser)
router.post('/', registerUser)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)
router.patch('/change', changePassword)
router.get(
  '/isLoggedIn',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user
    const userID = user.userID
    const username = user.username

    res.status(200).send({
      userID: userID,
      username: username,
    })
  }
)

export default router
