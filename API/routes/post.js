import express from 'express'
import {
  searchPostByPostID,
  searchPostByUserID,
  submitFeelingEntry,
  addPost,
} from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByPostID)
router.get('/all/:id', searchPostByUserID)
router.post('/feelingEntry', submitFeelingEntry)
router.post('/add', addPost)

export default router
