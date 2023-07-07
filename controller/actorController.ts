import { Request, Response } from 'express'
import Actor, { IActor } from '../models/ActorModel'


export const createActor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body

    const newActor: IActor = new Actor({
      name,
    })

    const savedActor: IActor = await newActor.save()

    res.status(201).json(savedActor)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const getAllActors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const actors: IActor[] = await Actor.find()

    res.status(200).json(actors)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const getActorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const actorId: string = req.params.id

    const actor: IActor | null = await Actor.findById(actorId)

    if (!actor) {
      res.status(404).json({ message: 'Actor not found' })
      return
    }

    res.status(200).json(actor)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const updateActor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const actorId: string = req.params.id
    const { name } = req.body

    const updatedActor: IActor | null = await Actor.findByIdAndUpdate(
      actorId,
      {
        name,
      },
      { new: true }
    )

    if (!updatedActor) {
      res.status(404).json({ message: 'Actor not found' })
      return
    }

    res.status(200).json(updatedActor)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const deleteActor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const actorId: string = req.params.id

    const deletedActor: IActor | null = await Actor.findByIdAndRemove(actorId)

    if (!deletedActor) {
      res.status(404).json({ message: 'Actor not found' })
      return
    }

    res.status(200).json({ message: 'Actor deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}