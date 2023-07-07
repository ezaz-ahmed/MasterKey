import express from 'express'
import { authenticateUser, authorizeUser } from '../middelware/authMiddleware'
import { createShow, deleteShow, getAllShows, getReviewsById, getShowById, updateShow } from '../controller/showController'

const router = express.Router()

router.post('/', authenticateUser, authorizeUser, createShow)
router.get('/', authenticateUser, getAllShows)
router.get('/review/:id', authenticateUser, getReviewsById)
router.get('/:id', authenticateUser, getShowById)
router.put('/:id', authenticateUser, authorizeUser, updateShow)
router.delete('/:id', authenticateUser, authorizeUser, deleteShow
)

export default router