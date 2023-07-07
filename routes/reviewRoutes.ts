import express from 'express'

import { authenticateUser } from '../middelware/authMiddleware'
import { createReview } from '../controller/reviewController'

const router = express.Router()

router.post('/', authenticateUser, createReview)

export default router
