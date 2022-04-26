import express from 'express'
import { getAvatar } from '../controllers/avatar.js'

const router = express.Router()
router.get('/getAvatarURL/:id', getAvatar)

export default router
