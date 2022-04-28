import express from 'express'
import {
  singleUser,
  updateAvatar,
  registerUser,
  deleteUser,
  loginUser,
  changePassword,
  isLoggedIn,
  userEmail,
  updateRewardPoints,
  updateDisplayName,
  getStars,
  getAchievementStatus,
  updateAchievementStatus,
} from '../controllers/appUser.js'
import passport from 'passport'
import '../config/passport.js'

const router = express.Router()
router.get('/getUser/:id', singleUser)
router.get('/getEmail/:email', userEmail)
router.get(
  '/getUser/:id',
  // passport.authenticate('jwt', { session: false }),
  singleUser
)
router.patch('/avatar/:id', updateAvatar)
router.get('/reward/getReward/:id', getStars)
router.get('/achievementOn/:id', getAchievementStatus)
router.patch('/achievementOn/update/:id', updateAchievementStatus)
router.post('/register', registerUser)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)
router.patch('/change', changePassword)
router.patch('/reward/:id', updateRewardPoints)
router.patch('/displayname/:id', updateDisplayName)
router.post(
  '/isLoggedIn',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user
    const userID = user.userID
    const username = user.username
  }
)
// router.post(
//   '/isLoggedIn',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const user = req.user
//     const userID = user.userID
//     const username = user.username

//     res.status(200).send({
//       userID: userID,
//       username: username,
//     })
//   }
// )

export default router
