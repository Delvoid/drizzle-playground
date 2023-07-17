import { z } from 'zod';

export const TodoValidator = z.object({
  task: z.string().min(1).max(255),
  complete: z.boolean().default(false).optional(),
  completed_at: z.string().optional(),
});

export type TodoCreateRequest = z.infer<typeof TodoValidator>;
