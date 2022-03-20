import express from 'express'
import {
  searchTagByPostID,
} from '../controllers/post_tag.js'

const router = express.Router()

router.get('/:id', searchTagByPostID)

export default router
