import { todos } from '@/lib/db/schema';
import { db } from '@/lib/db/turso';
import { TodoCreateRequest, TodoValidator } from '@/lib/validators/todos';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(_req: Request, { params }: { params: { taskId: string } }) {
  try {
    if (!params.taskId) return new NextResponse('Task id is required', { status: 400 });
    // check if number

    if (!Number(params.taskId))
      return new NextResponse('Task id must be a number', { status: 400 });

    const tasks = await db
      .select()
      .from(todos)
      .where(eq(todos.id, Number(params.taskId)))
      .get();

    if (!tasks) return new NextResponse('Task not found', { status: 404 });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log('[TODO_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { taskId: string } }) {
  try {
    if (!params.taskId) return new NextResponse('Task id is required', { status: 400 });
    // check if number

    if (!Number(params.taskId))
      return new NextResponse('Task id must be a number', { status: 400 });

    const task = await db
      .delete(todos)
      .where(eq(todos.id, Number(params.taskId)))
      .returning()
      .get();

    if (!task) return new NextResponse('Task not found', { status: 404 });

    return NextResponse.json(task);
  } catch (error) {
    console.log('[TODO_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { taskId: string } }) {
  try {
    if (!params.taskId) return new NextResponse('Task id is required', { status: 400 });

    if (!Number(params.taskId))
      return new NextResponse('Task id must be a number', { status: 400 });

    const body = await req.json();

    let query: TodoCreateRequest;

    query = TodoValidator.parse(body);

    if (query.complete !== undefined) {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];
      query.completed_at = `${date} ${time}`;
    }

    const todo = await db
      .update(todos)
      .set(query)
      .where(eq(todos.id, Number(params.taskId)))
      .returning()
      .get();

    if (!todo) return new NextResponse('Task not found', { status: 404 });

    return NextResponse.json(todo);
  } catch (error) {
    console.log('[TODO_PATCH]', error);
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
}
