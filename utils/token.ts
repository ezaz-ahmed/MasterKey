import jwt from 'jsonwebtoken'
import { IUser } from "../models/UserModel"

export const generateToken = (user: IUser): string => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
  return token
}