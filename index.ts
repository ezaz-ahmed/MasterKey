import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import userRouter from './routes/userRoutes'
import actorRouter from './routes/actorRoutes'
import directorRouter from './routes/directorRoutes'
import producerRouter from './routes/producerRoutes'
import showRouter from './routes/showRoutes'

dotenv.config()

const app: Express = express()
app.use(cookieParser())
app.use(express.json())

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Server is okay')
})

app.use('/api/users', userRouter)
app.use('/api/actors', actorRouter)
app.use('/api/producers', producerRouter)
app.use('/api/directors', directorRouter)
app.use('/api/shows', showRouter)

app.listen(port, async () => {
  const db = await connectDB()

  console.log(`${db.connection.host}\n MongoDB Connected`)
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})