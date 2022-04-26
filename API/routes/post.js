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
  deletePost,
} from '../controllers/post.js'

const router = express.Router()

router.get('/:id', searchPostByPostID)
router.get('/all/:id', searchPostByUserID)
router.post('/feelingEntry', submitFeelingEntry)
router.post('/newPost', newPost)
router.post('/tags', tags)
router.post('/image', image)
router.patch('/update', updatePost)
router.post('/add', addPost)
router.post('/deletePost', deletePost)

export default router
