import express from 'express'

import { createActor, deleteActor, getActorById, getAllActors, updateActor } from '../controller/actorController'
import { authenticateUser, authorizeUser } from '../middelware/authMiddleware'


const router = express.Router()

router.post('/', authenticateUser, authorizeUser, createActor)
router.get('/', authenticateUser, getAllActors)
router.get('/:id', authenticateUser, getActorById)
router.put('/:id', authenticateUser, authorizeUser, updateActor)
router.delete('/:id', authenticateUser, authorizeUser, deleteActor)

export default router
