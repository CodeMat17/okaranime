// app/not-admin/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function NotAdminPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      <div className='max-w-md w-full mx-4'>
        <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6'>
            <ShieldAlert className='h-8 w-8 text-red-600 dark:text-red-400' />
          </div>

          <h1 className='text-3xl font-bold text-slate-900 dark:text-white mb-4'>
            Access Denied
          </h1>

          <p className='text-slate-600 dark:text-slate-400 mb-6'>
            You don&apos;t have administrator privileges to access this page.
            Please contact the site administrator if you believe this is an
            error.
          </p>

          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Button asChild className='flex-1'>
                <Link href='/'>Back to Home</Link>
              </Button>
              <SignedIn>
             
                  <UserButton />
              
              </SignedIn>
            </div>

            <Button variant='outline' asChild className='w-full'>
              <Link href='/admin'>Try Again</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
