import { Request, Response } from 'express'
import Show, { IShow } from '../models/ShowModel'

export const createShow = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, type, runtime, director, producer, releaseDate, posterImage } = req.body

    const createdBy = req.user?.id

    if (!createdBy) {
      res.status(401).json({ message: 'Unauthorized - User not found' })
      return
    }

    const newShow: IShow = new Show({
      title,
      type,
      createdBy,
      runtime,
      director,
      producer,
      releaseDate,
      posterImage,
    })

    const savedShow: IShow = await newShow.save()

    res.status(201).json(savedShow)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// Get a list of all shows
export const getAllShows = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shows: IShow[] = await Show.find()

    res.status(200).json(shows)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// Get a single show by ID
export const getShowById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const showId: string = req.params.id

    const show: IShow | null = await Show.findById(showId)

    if (!show) {
      res.status(404).json({ message: 'Show not found' })
      return
    }

    res.status(200).json(show)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// Update a show
export const updateShow = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const showId: string = req.params.id

    const {
      title,
      type,
      createdBy,
      runtime,
      director,
      producer,
      releaseDate,
      posterImage,
    } = req.body

    const updatedShow: IShow | null = await Show.findByIdAndUpdate(
      showId,
      {
        title,
        type,
        createdBy,
        runtime,
        director,
        producer,
        releaseDate,
        posterImage,
      },
      { new: true }
    )

    if (!updatedShow) {
      res.status(404).json({ message: 'Show not found' })
      return
    }

    res.status(200).json(updatedShow)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// Delete a show
export const deleteShow = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const showId: string = req.params.id

    const deletedShow: IShow | null = await Show.findByIdAndRemove(showId)

    if (!deletedShow) {
      res.status(404).json({ message: 'Show not found' })
      return
    }

    res.status(200).json({ message: 'Show deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}