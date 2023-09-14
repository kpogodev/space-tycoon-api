import { prisma } from '../utils/prismaClient'
import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/ErrorResponse'
import { errorMessage } from '../utils/errorMessage'
import { createAgentSchema } from '../validators/agentValidator'
import { axiosRequest } from '../utils/axiosRequest'
import type { ExtendedRequest } from '../types/global'
import type { DataResponse} from '../types/spacetraders'

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
