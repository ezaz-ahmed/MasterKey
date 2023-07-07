import jwt from 'jsonwebtoken'
import { IUser } from "../models/UserModel"

export const generateToken = (user: IUser): string => {
  const token = jwt.sign({ id: user._id }, 'your-secret-key', {
    expiresIn: '1h',
  })
  return token
}