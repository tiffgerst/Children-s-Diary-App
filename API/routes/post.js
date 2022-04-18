import express from 'express'
import { searchPostByPostID, searchPostByUserID } from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByPostID)
router.get('/all/:id', searchPostByUserID)

export default router
