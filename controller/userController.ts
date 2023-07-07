import { Request, Response } from 'express'
import User, { IUser } from '../models/UserModel'
import { generateToken } from '../utils/token'

export const registrationUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Mantadory params are missing' })
      return
    }

    const existingUser: IUser | null = await User.findOne({ email })

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    const newUser: IUser = new User({
      name,
      email,
      password,
    })

    const savedUser: IUser = await newUser.save()

    const token: string = generateToken(savedUser)

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })

    res.status(200).json({ message: 'Account creation successful' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Mantadory params are missing' })
      return
    }

    const user: IUser | null = await User.findOne({ email })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Check if the entered password matches the stored password
    const isMatch: boolean = await user.matchPassword(password)

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    const token: string = generateToken(user)

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })

    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}