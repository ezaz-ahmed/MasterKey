import { Request, Response } from "express"
import Review, { IReview } from "../models/ReviewModel"
import { AuthenticatedRequest } from "../middelware/authMiddleware"

export const createReview = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { showId, rating, content } = req.body

    const { userId } = req.user?._id

    if (!showId || !rating || !content) {
      res.status(401).json({ message: 'Mandatory params are missing' })
      return
    }

    const newReview: IReview = new Review({
      show: showId, rating: Number(rating), content, user: userId
    })

    const savedReview: IReview = await newReview.save()

    res.status(201).json(savedReview)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


