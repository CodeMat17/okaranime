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
  news: Doc<"news"> & { imageUrls: string[] };
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
            imageStorageIds: news.images ?? (news.image ? [news.image] : []),
            imageUrls: news.imageUrls,
            captions: news.captions ?? [],
          }}
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
