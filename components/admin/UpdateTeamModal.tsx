// components/admin/UpdateTeamModal.tsx
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
import { TeamForm } from "@/app/admin/_components/TeamForm";

interface UpdateTeamModalProps {
  children: React.ReactNode;
  team: Doc<"team"> & { imageUrl?: string };
}

export function UpdateTeamModal({ children, team }: UpdateTeamModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Edit className='h-5 w-5' />
            Edit Team Member
          </DialogTitle>
          <DialogDescription>
            Update the team member information.
          </DialogDescription>
        </DialogHeader>
        <TeamForm
          initialData={{
            _id: team._id,
            name: team.name,
            position: team.position,
            description: team.description,
            email: team.email,
            imageUrl: team.imageUrl,
          }}
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
