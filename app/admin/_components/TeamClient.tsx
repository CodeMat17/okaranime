// app/admin/team/TeamClient.tsx
"use client";

import { AddTeamModal } from "@/components/admin/AddTeamModal";
import { DeleteTeamModal } from "@/components/admin/DeleteTeamModal";
import { UpdateTeamModal } from "@/components/admin/UpdateTeamModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Plus, Users } from "lucide-react";
import Image from "next/image";
import AdminPagesHeader from "./AdminPagesHeader";

export default function TeamClient() {
  const teamMembers = useQuery(api.team.getAllTeam) || [];

  return (
    <div className='pt-24 min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      {/* Header */}
      <header className='border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4'>
          <AdminPagesHeader />

          <div className='mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h1 className='text-3xl font-black text-foreground mb-2'>
                Team Management
              </h1>
            </div>

            {/* Add Team Button */}
            <AddTeamModal>
              <Button className='gap-2'>
                <Plus className='h-4 w-4' />
                Add New Team Member
              </Button>
            </AddTeamModal>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Team Members List */}
        <div>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-6'>
            Current Team Members ({teamMembers.length})
          </h2>

          {teamMembers.length === 0 ? (
            <div className='text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg'>
              <Users className='h-12 w-12 text-slate-400 mx-auto mb-4' />
              <p className='text-slate-600 dark:text-slate-400'>
                No team members yet. Add your first team member above.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {teamMembers.map((member) => (
                <Card key={member._id} className='overflow-hidden group py-0'>
                  <div className='aspect-square h-48 relative bg-slate-100 dark:bg-slate-800'>
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <Users className='h-16 w-16 text-slate-400' />
                      </div>
                    )}
                  </div>
                  <CardContent className='pt-0 pb-4'>
                    <h3 className='font-bold text-lg text-slate-900 dark:text-white'>
                      {member.name}
                    </h3>
                    <p className='text-primary font-medium text-sm mb-2'>
                      {member.position}
                    </p>
                    {member.email ? (
                      <p className='text-slate-600 dark:text-slate-400 text-sm mb-3'>
                        {member.email}
                      </p>
                    ) : (
                      <p className='text-slate-600 dark:text-slate-400 text-sm mb-3'>
                        No email
                      </p>
                    )}
                    <p className='text-slate-700 dark:text-slate-300 text-sm line-clamp-3'>
                      {member.description}
                    </p>

                    {/* Action buttons overlay on hover */}
                    <div className='mt-3 border-t pt-3 flex items-center justify-between gap-3'>
                      <UpdateTeamModal team={member}>
                        <Button variant='secondary' size='sm' className='gap-2'>
                          Edit
                        </Button>
                      </UpdateTeamModal>
                      <DeleteTeamModal team={member}>
                        <Button
                          variant='destructive'
                          size='sm'
                          className='gap-2'>
                          Delete
                        </Button>
                      </DeleteTeamModal>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
