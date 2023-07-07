import mongoose, { Document, Model, Schema } from 'mongoose'
import { IProducer } from './ProducerModel'
import { IDirector } from './DirectorModel'
import { IActor } from './ActorModel'

export interface IShow extends Document {
  title: string
  type: 'movie' | 'tv-show'
  actor: Schema.Types.ObjectId | IActor
  producer: Schema.Types.ObjectId | IProducer
  director: Schema.Types.ObjectId | IDirector
  runtime: number
  releaseDate: Date
  posterImage: string
}

export interface IShowModel extends Model<IShow> { }

const showSchema: Schema<IShow> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['movie', 'tv-show'],
    },
    actor: {
      type: Schema.Types.ObjectId,
      ref: 'Actor',
      required: true,
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: 'Producer',
      required: true,
    },
    director: {
      type: Schema.Types.ObjectId,
      ref: 'Director',
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    posterImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Show: IShowModel = mongoose.model<IShow, IShowModel>('Show', showSchema)

export default Show
