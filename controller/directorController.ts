import { Request, Response } from 'express'
import Director, { IDirector } from '../models/DirectorModel'


export const createDirector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body

    const newDirector: IDirector = new Director({
      name,
    })

    const savedDirector: IDirector = await newDirector.save()

    res.status(201).json(savedDirector)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const getAllDirectors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const directors: IDirector[] = await Director.find()

    res.status(200).json(directors)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const getDirectorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const directorId: string = req.params.id

    const director: IDirector | null = await Director.findById(directorId)

    if (!director) {
      res.status(404).json({ message: 'Director not found' })
      return
    }

    res.status(200).json(director)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const updateDirector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const directorId: string = req.params.id
    const { name } = req.body

    const updatedDirector: IDirector | null = await Director.findByIdAndUpdate(
      directorId,
      {
        name,
      },
      { new: true }
    )

    if (!updatedDirector) {
      res.status(404).json({ message: 'Director not found' })
      return
    }

    res.status(200).json(updatedDirector)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


export const deleteDirector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const directorId: string = req.params.id

    const deletedDirector: IDirector | null = await Director.findByIdAndRemove(
      directorId
    )

    if (!deletedDirector) {
      res.status(404).json({ message: 'Director not found' })
      return
    }

    res.status(200).json({ message: 'Director deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}