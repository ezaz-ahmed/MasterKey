import { Request, Response } from 'express'
import Producer, { IProducer } from '../models/ProducerModel'


export const createProducer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body

    const newProducer: IProducer = new Producer({
      name,
    })

    const savedProducer: IProducer = await newProducer.save()

    res.status(201).json(savedProducer)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const getAllProducers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producers: IProducer[] = await Producer.find()

    res.status(200).json(producers)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const getProducerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producerId: string = req.params.id

    const producer: IProducer | null = await Producer.findById(producerId)

    if (!producer) {
      res.status(404).json({ message: 'Producer not found' })
      return
    }

    res.status(200).json(producer)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const updateProducer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producerId: string = req.params.id
    const { name } = req.body

    const updatedProducer: IProducer | null = await Producer.findByIdAndUpdate(
      producerId,
      {
        name,
      },
      { new: true }
    )

    if (!updatedProducer) {
      res.status(404).json({ message: 'Producer not found' })
      return
    }

    res.status(200).json(updatedProducer)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

export const deleteProducer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producerId: string = req.params.id

    const deletedProducer: IProducer | null = await Producer.findByIdAndRemove(
      producerId
    )

    if (!deletedProducer) {
      res.status(404).json({ message: 'Producer not found' })
      return
    }

    res.status(200).json({ message: 'Producer deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}