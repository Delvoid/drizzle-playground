'use client';

import axios from 'axios';
import { useState } from 'react';
import { Copy, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { TaskColumn } from './columns';
import { AlertModal } from '@/modals/alert-modal';

interface CellActionProps {
  data: TaskColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: deleteTodo, isLoading: deleteIsLoading } = useMutation({
    mutationFn: async () => {
      return await axios.delete(`/api/tasks/${data.id}`);
    },
    onError: (error) => {
      console.log('unable to delete task');
      console.log(error);
      setOpen(false);
      return toast({
        title: 'Something went wrong.',
        description: 'Your task could not be deleted, try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Task deleted.',
        description: 'Your task was successfully deleted.',
        variant: 'default',
      });
      setOpen(false);
    },
  });

  const onConfirm = async () => {
    deleteTodo();
  };

  const onCopy = (task: string) => {
    navigator.clipboard.writeText(task);
    toast({
      icon: <Copy />,
      title: 'Task copied to clipboard.',
      variant: 'default',
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={deleteIsLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.task)}>
            <Copy className="mr-2 h-4 w-4" /> Copy task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
