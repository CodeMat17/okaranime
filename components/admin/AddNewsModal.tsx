// components/admin/AddNewsModal.tsx
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
import { Plus } from "lucide-react";
import { NewsForm } from "./NewsForm";

interface AddNewsModalProps {
  children: React.ReactNode;
}

export function AddNewsModal({ children }: AddNewsModalProps) {
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
            <Plus className='h-5 w-5' />
            Add New News
          </DialogTitle>
          <DialogDescription>
            Create a new news article to share with your community.
          </DialogDescription>
        </DialogHeader>
        <NewsForm onSuccess={handleSuccess} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
