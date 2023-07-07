import express from 'express'
import { loginUser, registrationUser } from '../controller/userController'

const router = express.Router()

router.post('/register', registrationUser)
router.post('/login', loginUser)

export default router