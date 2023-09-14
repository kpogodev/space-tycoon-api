import { prisma } from '../utils/prismaClient'
import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/ErrorResponse'
import { errorMessage } from '../utils/errorMessage'
import { createAgentSchema } from '../validators/agentValidator'
import { axiosRequest } from '../utils/axiosRequest'
import type { ExtendedRequest } from '../types/global'
import type { DataResponse} from '../types/spacetraders'

// @desc   Get all agents
// @route  GET /api/agent
// @access Private
export const getAgents = asyncHandler(async (req: ExtendedRequest, res, next) => {
    const { id: userId } = req?.user || {}

    if (!userId) return next(new ErrorResponse('Something went wrong (Incorrect userId)', 500))

    const agents = await prisma.agent.findMany({
        where: {
            userId: userId,
        },
    })

    res.status(200).json({ success: true, data: agents })
})

// @desc   Get a single agent
// @route  GET /api/agent/:id
// @access Private
export const getAgent = asyncHandler(async (req: ExtendedRequest, res, next) => {
    const { id: userId } = req?.user || {}
    const { id: agentId } = req?.params || {}

    if (!userId) return next(new ErrorResponse('Something went wrong (Incorrect userId)', 500))

    const agent = await prisma.agent.findUnique({
        where: {
            id: +agentId,
            userId: userId,
        },
    })

    if (!agent) return next(new ErrorResponse('Agent not found', 404))

    res.status(200).json({ success: true, data: agent })
})

// @desc   Create a new agent
// @route  POST /api/agent
// @access Private
export const createAgent = asyncHandler(async (req: ExtendedRequest, res, next) => {
    const { id: userId, email: userEmail } = req?.user || {}
    const validBody = createAgentSchema.safeParse(req.body)

    if (!userId) return next(new ErrorResponse('Something went wrong (Incorrect userId)', 500))

    if (!validBody.success) {
        return next(new ErrorResponse(errorMessage(validBody.error), 400))
    }

    const requestBody = {
        symbol: validBody.data.symbol,
        faction: validBody.data.faction,
        email: userEmail,
    }

    const {
        data: { token },
    } = await axiosRequest<typeof requestBody, DataResponse>('POST', 'https://api.spacetraders.io/v2/register', requestBody)

    const agent = await prisma.agent.create({
        data: {
            userId: userId,
            symbol: validBody.data.symbol,
            faction: validBody.data.faction,
            token: token,
        },
    })

    if (!agent) return next(new ErrorResponse('Agent not created', 500))

    res.status(201).json({ success: true, data: agent })
})

// @desc   Get agents list
// @route  GET /api/agent/list
// @access Private
export const getAgentsList = asyncHandler(async (req: ExtendedRequest, res, next) => {
    const { id: userId } = req?.user || {}

    if (!userId) return next(new ErrorResponse('Something went wrong (Incorrect userId)', 500))

    const agents = await prisma.agent.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            symbol: true,
            faction: true,
        },
    })

    if (!agents) return next(new ErrorResponse('Agents not found', 404))

    res.status(200).json({ success: true, data: agents })
})

// @desc   Get agent token
// @route  GET /api/agent/token/:id
// @access Private
export const getAgentToken = asyncHandler(async (req: ExtendedRequest, res, next) => {
    const { id: userId } = req?.user || {}
    const { id: agentId } = req?.params || {}

    if (!userId) return next(new ErrorResponse('Something went wrong (Incorrect userId)', 500))

    const agent = await prisma.agent.findUnique({
        where: {
            id: +agentId,
            userId: userId,
        },
        select: {
            token: true,
        },
    })

    if (!agent) return next(new ErrorResponse('Agent not found', 404))

    res.status(200).json({ success: true, data: agent })
})
