import express from 'express'
import {
  searchImageByPostID,
} from '../controllers/postImageUploaded.js'

const router = express.Router()

router.get('/:id', searchImageByPostID)

export default router
