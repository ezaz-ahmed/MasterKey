import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IActor extends Document {
  name: string
  shows: Array<Schema.Types.ObjectId>
}

export interface IActorModel extends Model<IActor> { }

const actorSchema: Schema<IActor> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Show',
    },
  ],
})

const Actor: IActorModel = mongoose.model<IActor, IActorModel>('Actor', actorSchema)

export default Actor
