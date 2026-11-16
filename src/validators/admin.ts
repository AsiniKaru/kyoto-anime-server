import { z } from 'zod';

export const updateRoleSchema = z.object({
  role: z.enum(['user', 'admin']),
});

export const adminUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  q: z.string().trim().max(80).optional().default(''),
});

export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
