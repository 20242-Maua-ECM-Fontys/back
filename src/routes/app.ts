import express, { Request, Response } from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()
app.use(cors())


app.use(express.json())
app.use('/api', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from MauaGrid API')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
