'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { CheckSquare, Edit2, PlusCircle } from 'lucide-react';
import { TodoCreateRequest } from '@/lib/validators/todos';
import { InferModel } from 'drizzle-orm';
import { todos } from '@/lib/db/schema';
import { cn } from '@/lib/utils';
import { TaskColumn } from './columns';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableProps {
  columns: ColumnDef<TaskColumn>[];
  data: TaskColumn[];
  searchKey: string;
}

export function DataTable({ columns, data, searchKey }: DataTableProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [text, setText] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  console.log(table.getRowModel().flatRows.length);

  const { mutate: createTodo, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: TodoCreateRequest = {
        task: text,
      };
      return await axios.post(`/api/tasks/`, payload);
    },
    onError: (error) => {
      console.log('unable to add task');
      console.log(error);
      return toast({
        title: 'Something went wrong.',
        description: 'Your task could not be added, try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      setText('');
      toast({
        icon: <CheckSquare />,
        title: 'Task added.',
        description: 'Your task was successfully deleted.',
        variant: 'default',
      });
    },
  });
  const { mutate: updateTodo, isLoading: updateLoading } = useMutation({
    mutationFn: async (todo: InferModel<typeof todos>) => {
      const payload: TodoCreateRequest = {
        task: todo.task,
        complete: !todo.complete,
      };
      return await axios.patch(`/api/tasks/${todo.id}`, payload);
    },
    onError: (error) => {
      console.log('unable to update task');
      console.log(error);
      return toast({
        title: 'Something went wrong.',
        description: 'Your task could not be updated, try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        icon: <Edit2 />,
        title: 'Task updated.',
        description: 'Your task was successfully updated.',
        variant: 'default',
      });
    },
  });

  const handleAdd = () => {
    if (!text) {
      return;
    }
    createTodo();
  };

  const handleDoubleClick = (todo: InferModel<typeof todos>) => {
    console.log({ data: todo });
    updateTodo(todo);
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center py-4 w-full">
        <Input
          placeholder="Add task"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <Button className="ml-4 bg-green-600 text-white" onClick={handleAdd} isLoading={isLoading}>
          Add
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'last:flex last:justify-end',
                        row.original.complete &&
                          cell.column.id === 'task' &&
                          'line-through text-gray-500 '
                      )}
                      onDoubleClick={() => {
                        handleDoubleClick(row.original as InferModel<typeof todos>);
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.filter((row) => row.original.complete).length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) completed.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
