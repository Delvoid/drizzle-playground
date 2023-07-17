'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-actions';

export type TaskColumn = {
  id: number;
  task: string;
  complete: boolean;
};

export const columns: ColumnDef<TaskColumn>[] = [
  {
    accessorKey: 'task',
    header: 'Task',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
