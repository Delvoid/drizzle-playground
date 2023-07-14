import { z } from 'zod';

export const UserValidator = z.object({
  fullName: z.string({ required_error: 'fullName is required' }).min(1),
});

export type UserCreateRequest = z.TypeOf<typeof UserValidator>;
