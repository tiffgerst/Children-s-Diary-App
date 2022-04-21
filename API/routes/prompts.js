import express from 'express'
import { getPrompt } from '../controllers/prompts.js'
import passport from 'passport'
import '../config/passport.js'

const router = express.Router()
router.get('/', getPrompt)

export default router
