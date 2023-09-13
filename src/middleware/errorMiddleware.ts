import ErrorResponse from '../utils/ErrorResponse.js'
import type { Request, Response, NextFunction } from 'express'

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err }
    error.message = err.message

    res.status(error.statusCode || 500).json({
        message: error.message || 'Server Error',
        stack: process.env.NODE_ENV !== 'production' && error.stack,
    })
}

export { notFound, errorHandler }
