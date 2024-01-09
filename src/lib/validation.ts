import * as z from 'zod'

export const createAccountSchema = z.object({
  name: z.string().min(2).max(8),
  pin: z.string().min(4).max(4),
})

export const loginSchema = z.object({
  pin: z.string().min(4).max(4),
})

export type CreateFormType = z.infer<typeof createAccountSchema>

export type LoginFormType = z.infer<typeof loginSchema>
