import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth'
import agentRouter from './routes/agent'
import { errorHandler, notFound } from './middleware/errorMiddleware'

const PORT: number = process.env.PORT ? +process.env.PORT : 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/agent', agentRouter)

// Middlewares
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))