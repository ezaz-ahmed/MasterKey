import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import userRouter from './routes/userRoutes'

dotenv.config()

const app: Express = express()
app.use(cookieParser())
app.use(express.json())

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Server is okay')
})

app.use('/api/users', userRouter)

app.listen(port, async () => {
  const db = await connectDB()

  console.log(`${db.connection.host}\n MongoDB Connected`)
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})