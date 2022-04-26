import express from 'express'
import {
  searchPostByPostID,
  searchPostByUserID,
  submitFeelingEntry,
  newPost,
  tags,
  image,
  updatePost,
  addPost,
} from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByPostID)
router.get('/all/:id', searchPostByUserID)
router.post('/feelingEntry', submitFeelingEntry)
router.post('/newPost', newPost)
router.post('/tags', tags)
router.post('/image', image)
router.patch('/update/:id', updatePost)
router.post('/add', addPost)

export default router
