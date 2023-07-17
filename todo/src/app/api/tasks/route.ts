import { todos } from '@/lib/db/schema';
import { db } from '@/lib/db/turso';
import { TodoValidator } from '@/lib/validators/todos';
import { sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = async (_req: NextRequest) => {
  const tasks = await db.select().from(todos).all();

  return NextResponse.json(tasks);
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { task, complete } = TodoValidator.parse(body);

    const todo = await db.insert(todos).values({ task, complete }).returning().get();

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.log('[TODOS_POST]', error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const deleteAll = await db.delete(todos).returning().all();

    return NextResponse.json({ count: deleteAll.length }, { status: 200 });
  } catch (error) {
    console.log('[TODOS_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};
