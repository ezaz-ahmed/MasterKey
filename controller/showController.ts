import { Request, Response } from 'express'
import Show, { IShow } from '../models/ShowModel'
import { AuthenticatedRequest } from '../middelware/authMiddleware'
import Actor, { IActor } from '../models/ActorModel'
import Director, { IDirector } from '../models/DirectorModel'
import Producer, { IProducer } from '../models/ProducerModel'
import Review, { IReview } from '../models/ReviewModel'

export const createShow = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, type, runtime, releaseDate, posterImage, actorName, directorName, producerName } = req.body

    if (!title || !type || !runtime || !releaseDate || !posterImage || !actorName || !directorName || !producerName) {
      res.status(401).json({ message: 'Mandatory params are missing' })
      return
    }

    const createdBy = req.user?._id

    if (!createdBy) {
      res.status(401).json({ message: 'Unauthorized - User not found' })
      return
    }

    const actor = await Actor.findOne({ name: actorName }) as IActor
    const createdActor: IActor = actor || (await Actor.create({ name: actorName })) as IActor


    const director = await Director.findOne({ name: directorName }) as IDirector

    const createdDirector = director || (await Director.create({ name: directorName })) as IDirector


    const producer = await Producer.findOne({ name: producerName }) as IProducer
    const createdProducer = producer || (await Producer.create({ name: producerName })) as IProducer

    const newShow: IShow = new Show({
      title,
      type,
      runtime,
      releaseDate,
      posterImage,
      actor: createdActor._id,
      director: createdDirector._id,
      producer: createdProducer._id,
    })

    const savedShow: IShow = await newShow.save()

    res.status(201).json(savedShow)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

export const getAllShows = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pageNumber: number = parseInt(req.query.pageNumber as string) || 1
    const pageSize: number = parseInt(req.query.pageSize as string) || 10

    const skipCount: number = (pageNumber - 1) * pageSize

    const totalShowsCount: number = await Show.countDocuments().exec()

    const shows: IShow[] = await Show.aggregate([
      { $skip: skipCount },
      { $limit: pageSize },
    ])

    res.status(200).json({
      shows,
      totalShowsCount,
      currentPage: pageNumber,
      pageSize,
      totalPages: Math.ceil(totalShowsCount / pageSize),
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

export const getShowById = async (req: Request, res: Response) => {
  try {
    const showId: string = req.params.id

    const show: IShow | null = await Show.findById(showId)
      .populate('actor', 'name')
      .populate('director', 'name')
      .populate('producer', 'name')


    if (!show) {
      res.status(404).json({ message: 'Show not found' })
      return
    }

    res.status(200).json(show)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

export const updateShow = async (req: Request, res: Response) => {
  try {
    const showId: string = req.params.id
    const { title, type, runtime, releaseDate, posterImage } = req.body

    const updatedShow: IShow | null = await Show.findByIdAndUpdate(
      showId,
      {
        title,
        type,
        runtime,
        releaseDate,
        posterImage,
      },
      { new: true }
    )
      .populate('actor', 'name')
      .populate('director', 'name')
      .populate('producer', 'name')

    if (!updatedShow) {
      res.status(404).json({ message: 'Show not found' })
      return
    }

    res.status(200).json(updatedShow)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}


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

export const getReviewsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const showId: string = req.params.showId

    try {
      const reviews: IReview[] = await Review.find({ movie: showId }).select("rating content")
        .populate('show', 'title')
        .populate('user', 'name')

      res.status(200).json(reviews)
    } catch (error) {
      console.log(error)
    }





  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}