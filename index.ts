import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Server is okay')
})

app.listen(port, async () => {
  const db = await connectDB()

  console.log(`${db.connection.host}\n MongoDB Connected`)
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})