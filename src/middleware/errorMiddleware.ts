import ErrorResponse from '../utils/ErrorResponse'
import type { Request, Response, NextFunction } from 'express'

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err };
    error.message = err.message

    // Log for debugging
    console.error(err);

    switch (err.code) {
        // Unique Constraint
        case 'P2002':
            if (err.meta && err.meta.target) {
                const target = err.meta.target.join(', ');
                error = new ErrorResponse(`${target} already exists`, 400);
            }
            break;

        // Record Not Found
        case 'P2001':
            error = new ErrorResponse('The specified record does not exist', 404);
            break;

        // Foreign Key Constraint
        case 'P2003':
            error = new ErrorResponse('Invalid reference. The related record does not exist.', 400);
            break;

        // Mandatory Value Missing
        case 'P2004':
            error = new ErrorResponse('A mandatory value is missing.', 400);
            break;

        // Invalid Value Provided
        case 'P2005':
            error = new ErrorResponse('An invalid value was provided.', 400);
            break;

        // Connection Issues
        case 'P2009':
        case 'P2010':
            error = new ErrorResponse('Database connection error. Please try again.', 503);
            break;

        // Raw Query Fail
        case 'P2015':
            error = new ErrorResponse('Database query failed.', 500);
            break;

        // Default for other Prisma errors or if the error isn't a Prisma error
        default:
            if (!error.statusCode) {
                error.statusCode = 500;
                error.message = 'Server Error';
            }
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
}

export { notFound, errorHandler }
