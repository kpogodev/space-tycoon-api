import z from 'zod';
import { Faction as PrismaFaction } from '@prisma/client';

export const createAgentSchema = z.object({
    symbol: z.string().min(3).max(14),
    faction: z.nativeEnum(PrismaFaction)
});
