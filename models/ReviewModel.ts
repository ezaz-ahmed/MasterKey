import mongoose, { Document, Model, Schema } from 'mongoose'
import { IShow } from './ShowModel'
import { IUser } from './UserModel'

export interface IReview extends Document {
  show: IShow['_id']
  user: IUser['_id']
  rating: number
  content: string
  createdAt: Date
}

export interface IReviewModel extends Model<IReview> { }

const reviewSchema: Schema<IReview> = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)



const Review: IReviewModel = mongoose.model<IReview, IReviewModel>('Review', reviewSchema)

export default Review
