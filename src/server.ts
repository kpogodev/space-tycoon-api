import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth'
import agentRouter from './routes/agent'
import { errorHandler, notFound } from './middleware/errorMiddleware'

const PORT: number = process.env.PORT ? +process.env.PORT : 5000
const isProduction = process.env.NODE_ENV === 'production'
const frontEndOrigin = process.env.FRONTEND_URL
const morganLogsType: string = process.env.MORGAN_LOGS_TYPE || 'dev'

const app = express()


app.use(helmet())
app.use(
    cors({
        origin: isProduction ? frontEndOrigin : 'http://localhost:3000',
        credentials: true,
    })
)
app.use(morgan(isProduction ? morganLogsType : 'dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/agent', agentRouter)

// Middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
