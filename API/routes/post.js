import express from 'express'
import {
  searchPostByUserID,
} from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByUserID)

export default router
