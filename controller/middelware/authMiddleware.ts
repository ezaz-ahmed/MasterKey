import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../../models/UserModel'

interface AuthenticatedRequest extends Request {
  user?: IUser
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'Unauthorized - No token provided' })
      return
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)

    const user: IUser | null = await User.findById(decoded.id)

    if (!user) {
      res.status(401).json({ message: 'Unauthorized - Invalid token' })
      return
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized - Invalid token' })
  }
}

export const authorizeUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  if (!req.user.isAdmin) {
    res.status(403).json({ message: 'Forbidden - Not authorized' })
    return
  }

  next()
}
