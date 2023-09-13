import { prisma } from '../utils/prismaClient'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/ErrorResponse'
import { errorMessage } from '../utils/errorMessage'
import { registerSchema, loginSchema } from '../validators/authValidator'
import type { Response } from 'express'

// Helpers
const generateToken = (id: number, res: Response) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1h
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
    const validBody = registerSchema.safeParse(req.body)

    if (!validBody.success) return next(new ErrorResponse(errorMessage(validBody.error), 400))

    const userExist = await prisma.user.findUnique({
        where: {
            email: validBody.data.email,
        },
    })

    if (userExist) return next(new ErrorResponse('User already exists', 400))

    const newUser = await prisma.user.create({
        data: {
            ...validBody.data,
            password: await bcrypt.hash(validBody.data.password, await bcrypt.genSalt(10)),
        },
        select: {
            id: true,
            email: true,
            nick: true,
        },
    })

    if (!newUser) return next(new ErrorResponse('Something went wrong', 500))
    generateToken(newUser.id, res)

    res.status(201).json({ success: true, data: newUser })
})

// @desc    Login user / set cookie
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res, next) => {
    const validBody = loginSchema.safeParse(req.body)

    if (!validBody.success) return next(new ErrorResponse(errorMessage(validBody.error), 400))

    const user = await prisma.user.findUnique({
        where: {
            email: validBody.data.email,
        },
    })

    if (!user) return next(new ErrorResponse('Invalid credentials', 401))

    const isMatch = await bcrypt.compare(validBody.data.password, user.password)

    if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401))

    generateToken(user.id, res)

    // Remove password from response
    const { password, ...rest } = user

    res.status(200).json({ success: true, data: rest})
})

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json()
})
