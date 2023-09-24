import z from 'zod'
import { Faction as PrismaFaction } from '@prisma/client'

export const createAgentSchema = z.object({
    symbol: z.string().min(3).max(14),
    faction: z.nativeEnum(PrismaFaction),
})

export const patchAgentSchema = z
    .union([z.object({ avatar: z.string() }), z.object({ faction: z.nativeEnum(PrismaFaction) })])
    .refine((data) => Object.keys(data).length === 1, {
        message: 'Only one field can be updated at a time.',
    })
