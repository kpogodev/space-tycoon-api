import asyncHandler from 'express-async-handler'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from '../utils/prismaClient'
import ErrorResponse from '../utils/ErrorResponse'
import type { ExtendedRequest } from '../types/global'
import type { NextFunction, Response } from 'express'

export const authMiddleware = asyncHandler(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined = req.cookies.jwt

    if (!token) throw new ErrorResponse('Unauthorized, no token', 401)

    const secret = process.env.JWT_SECRET
    if (!secret) throw new ErrorResponse('Server error, JWT_SECRET not defined', 500)

    const decoded: JwtPayload | string = jwt.verify(token, secret)

    if (typeof decoded === 'string') throw new ErrorResponse('Unauthorized, incorrect token shape', 401)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
        select: {
            id: true,
            email: true,
            nick: true,
        },
    })

    if (!user) throw new ErrorResponse('Unauthorized, token failed', 401)

    req.user = user
    next()
})
