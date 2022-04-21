import express from 'express'
import { getBackground } from '../controllers/background.js'

const router = express.Router()
router.get('/', getBackground)

export default router
