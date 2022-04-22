import express from 'express'
import { defaultMoodIcons, linkMoodIcons } from '../controllers/moodIcons.js'

const router = express.Router()
router.get('/getMoodIcons', defaultMoodIcons)
router.post('/postLink', linkMoodIcons)

export default router
