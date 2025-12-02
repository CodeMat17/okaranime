// components/admin/DeleteTeamModal.tsx
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

interface DeleteTeamModalProps {
  children: React.ReactNode;
  team: Doc<"team">;
}

export function DeleteTeamModal({ children, team }: DeleteTeamModalProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTeam = useMutation(api.team.deleteTeam);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTeam({ id: team._id });
      setOpen(false);
    } catch (error) {
      console.error("Error deleting team member:", error);
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
            Delete Team Member
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{team.name}&quot;? This action
            cannot be undone.
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
