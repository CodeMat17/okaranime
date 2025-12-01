// components/admin/UpdateNewsModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { NewsForm } from "./NewsForm";

interface UpdateNewsModalProps {
  children: React.ReactNode;
  news: Doc<"news"> & { imageUrl?: string };
}

export function UpdateNewsModal({ children, news }: UpdateNewsModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    // You might want to refresh the news list here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Edit className='h-5 w-5' />
            Edit News
          </DialogTitle>
          <DialogDescription>
            Update the news article information.
          </DialogDescription>
        </DialogHeader>
        <NewsForm
          initialData={{
            _id: news._id,
            title: news.title,
            content: news.content,
            imageUrl: news.imageUrl,
          }}
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
