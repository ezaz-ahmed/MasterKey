import express from 'express'

import { authenticateUser, authorizeUser } from '../middelware/authMiddleware'
import { createProducer, deleteProducer, getAllProducers, getProducerById, updateProducer } from '../controller/producerController'


const router = express.Router()

router.post('/', authenticateUser, authorizeUser, createProducer)
router.get('/', authenticateUser, getAllProducers)
router.get('/:id', authenticateUser, getProducerById)
router.put('/:id', authenticateUser, authorizeUser, updateProducer)
router.delete('/:id', authenticateUser, authorizeUser, deleteProducer)

export default router
