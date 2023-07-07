import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IProducer extends Document {
  name: string
}

export interface IProducerModel extends Model<IProducer> { }

const producerSchema: Schema<IProducer> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)

const Producer: IProducerModel = mongoose.model<IProducer, IProducerModel>('Producer', producerSchema)

export default Producer