import express from 'express'
import {
  searchPostByPostID,
  searchPostByUserID,
  submitFeelingEntry,
} from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByPostID)
router.get('/all/:id', searchPostByUserID)
router.post('/feelingEntry', submitFeelingEntry)

export default router
