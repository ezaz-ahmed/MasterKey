import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IDirector extends Document {
  name: string
}

export interface IDirectorModel extends Model<IDirector> { }

const directorSchema: Schema<IDirector> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const Director: IDirectorModel = mongoose.model<IDirector, IDirectorModel>('Director', directorSchema)

export default Director