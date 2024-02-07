import express, { Request, Response, Application } from 'express'
import morgan from 'morgan'
import router from './components/index'
import errorHandler from './helpers/errorHandler'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// loggin all the requests in middleware
app.use(morgan('dev'))

// routes
app.get('/fe', (req, res) => {
  res.status(200).json({ message: 'Welcome' })
})
app.use('/api/v1', router)

// error handler
app.use(errorHandler)

// 404
app.use((req: Request, res: Response) => {
  const error = new Error('not found')

  return res.status(404).json({
    message: error.message,
  })
})

export default app
