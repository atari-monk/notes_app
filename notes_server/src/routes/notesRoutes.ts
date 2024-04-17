import express from 'express'
import {
  appendChat,
  loadChat,
  updateChat,
} from '../controllers/notesController'

const router = express.Router()

router.post('/append/:category/:filename', appendChat)
router.post('/getQuestion/:category/:filename', loadChat)
router.patch('/edit/:category/:filename', updateChat)

export default router
