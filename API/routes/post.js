import express from 'express'
import {
  searchPost,
} from '../controllers/post.js'

const router = express.Router()

router.get('/:post_id', searchPost)

export default router
