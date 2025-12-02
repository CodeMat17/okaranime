"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AdminPagesHeader = () => {
  return (
    <div className='flex items-center justify-between gap-4 border-b pb-3'>
      <Button
        variant='outline'
        size='sm'
        asChild
        className='dark:border-gray-700 dark:hover:text-gray-400'>
        <Link href='/admin'>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to Dashboard
        </Link>
      </Button>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default AdminPagesHeader;
