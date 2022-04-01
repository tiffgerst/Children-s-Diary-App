import express from 'express'
import { searchPostByUserID, postWithImageTag } from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByUserID)
router.get('/all/:id', postWithImageTag)

export default router
