import express from 'express'
import {
  searchPostByPostID,
  searchPostByUserID,
  submitFeelingEntry,
  newPost,
  tags,
} from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByPostID)
router.get('/all/:id', searchPostByUserID)
router.post('/feelingEntry', submitFeelingEntry)
router.post('/newPost', newPost)
router.post('/tags', tags)
export default router
