import type { ZodError } from "zod"

export const errorMessage = (error: ZodError) => {
    return error.issues.map(issue => `${issue.path}: ${issue.message}`).join(" | ")
}