import { TaskColumn, columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import { ThemeToggle } from '@/components/theme-toggle';
import { todos } from '@/lib/db/schema';
import { db } from '@/lib/db/turso';

export default async function Home() {
  const tasks = await db.select().from(todos).all();

  const formattedTasks: TaskColumn[] = tasks.map((task) => ({
    id: task.id,
    task: task.task ?? '',
    complete: task.complete ?? false,
  }));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex w-full max-w-2xl">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">Here&apos;s a list of your tasks!</p>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>

        <DataTable searchKey="task" data={formattedTasks} columns={columns} />
      </div>
    </main>
  );
}
