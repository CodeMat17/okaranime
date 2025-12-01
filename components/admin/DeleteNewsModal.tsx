// components/admin/DeleteNewsModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Trash2 } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

interface DeleteNewsModalProps {
  children: React.ReactNode;
  news: Doc<"news">;
}

export function DeleteNewsModal({ children, news }: DeleteNewsModalProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteNews = useMutation(api.news.deleteNews);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteNews({ id: news._id });
      setOpen(false);
      // You might want to refresh the news list here
    } catch (error) {
      console.error("Error deleting news:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-destructive'>
            <Trash2 className='h-5 w-5' />
            Delete News
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{news.title}&quot;? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className='flex gap-3 justify-end pt-4'>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isDeleting}
            className='gap-2'>
            {isDeleting ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className='h-4 w-4' />
                Delete
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
