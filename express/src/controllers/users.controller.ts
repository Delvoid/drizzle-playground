import type { Response, Request } from 'express';

import { db } from '../db/db';
import { users } from '../db/schema';
import { InferModel, eq } from 'drizzle-orm';
import { UserCreateRequest } from '../validators/users';

type User = InferModel<typeof users>;

export const getAllUsers = async (_: Request, res: Response<User[]>) => {
  const response = await db.select().from(users);
  res.status(200).json(response);
};

export const createUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserCreateRequest>,
  res: Response<Pick<User, 'id'>>
) => {
  const { fullName } = req.body;
  const user = await db.insert(users).values({ fullName }).returning();

  res.status(200).json({ id: user[0].id });
};

export const updateUser = async (
  // UserCreateRequest is the type of the request body
  req: Request<Record<string, string>, Record<string, unknown>, UserCreateRequest>,
  res: Response<User | { error: string }>
) => {
  const { id } = req.params;
  const { fullName } = req.body;

  if (isNaN(Number(id))) {
    res.status(400).json({ error: 'id must be a number' });
    return;
  }

  const update = await db
    .update(users)
    .set({ fullName })
    .where(eq(users.id, Number(id)))
    .returning();

  res.status(200).json(update[0]);
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<User | { error: string }>
) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).json({ error: 'id must be a number' });
    return;
  }

  const deleted = await db
    .delete(users)
    .where(eq(users.id, Number(id)))
    .returning();

  res.status(200).json(deleted[0]);
};
