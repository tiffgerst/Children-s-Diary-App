import express from 'express'
import {
  singleUser,
  updateUser,
  registerUser,
  deleteUser,
  loginUser,
  changePassword,
} from '../controllers/appUser.js'

const router = express.Router()

router.get('/:id', singleUser)
router.patch('/:id', updateUser)
router.post('/', registerUser)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)
router.patch('/change', changePassword)

export default router
