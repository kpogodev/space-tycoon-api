import z from 'zod'

export const registerSchema = z.object({
    nick: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
    email: z.string().email(),
    password: z.string().min(6).max(100),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
})