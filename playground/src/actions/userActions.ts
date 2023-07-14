import { InferModel, eq } from 'drizzle-orm';
import { db } from '../db/db';
import { users } from '../db/schema';

export const createUser = async (user: InferModel<typeof users, 'insert'>) => {
  const res = await db.insert(users).values(user).returning();

  return res[0].id;
};

export const listUsers = async () => {
  const res = await db.select().from(users);

  return res;
};

export const updateUser = async (id: number, newName: string) => {
  const res = await db.update(users).set({ fullName: newName }).where(eq(users.id, id)).returning();

  return res[0];
};

export const deleteUser = async (id: number) => {
  const res = await db.delete(users).where(eq(users.id, id)).returning();

  return res[0];
};
