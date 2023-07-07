import express from 'express'

import { authenticateUser, authorizeUser } from '../middelware/authMiddleware'
import { createDirector, deleteDirector, getAllDirectors, getDirectorById, updateDirector } from '../controller/directorController'

const router = express.Router()

router.post('/', authenticateUser, authorizeUser, createDirector)
router.get('/', authenticateUser, getAllDirectors)
router.get('/:id', authenticateUser, getDirectorById)
router.put('/:id', authenticateUser, authorizeUser, updateDirector)
router.delete('/:id', authenticateUser, authorizeUser, deleteDirector)

export default router
