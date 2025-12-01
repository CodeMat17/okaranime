// app/admin/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkRole } from "@/utils/roles";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FileText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AdminPage() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <div className='pt-24 min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      {/* Header */}
      <header className='border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-3'>
              {/* <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div> */}
              <div>
                <h1 className='text-xl font-bold text-slate-900 dark:text-white'>
                  Admin Dashboard
                </h1>
                <p className='text-sm text-slate-500 dark:text-slate-400'>
                  OKARANIME HERITAGE FOUNDATION
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                size='sm'
                asChild
                className='dark:border-gray-700'>
                <Link href='/'>View Frontend</Link>
              </Button>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-2'>
            Welcome, Administrator
          </h2>
          <p className='text-slate-600 dark:text-slate-400'>
            Manage your NGO&apos;s content, users, and settings from this
            dashboard.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* News Management */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-5 w-5 text-primary' />
                News Management
              </CardTitle>
              <CardDescription>
                Create, edit, and publish news articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-slate-600 dark:text-slate-400 mb-4'>
                Manage all news content for your website. Add new articles,
                update existing ones, or remove outdated content.
              </p>
              <Button asChild className='w-full'>
                <Link href='/admin/news'>Manage News</Link>
              </Button>
            </CardContent>
          </Card>

          {/* User Management */}
          {/* <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-5 w-5 text-primary' />
                User Management
              </CardTitle>
              <CardDescription>
                Manage admin users and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-slate-600 dark:text-slate-400 mb-4'>
                Add new administrators, manage roles, and review user activity.
              </p>
              <Button asChild className='w-full' variant='outline'>
                <Link href='/admin/users'>Manage Users</Link>
              </Button>
            </CardContent>
          </Card> */}

          {/* Settings */}
          {/* <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Settings className='h-5 w-5 text-primary' />
                Site Settings
              </CardTitle>
              <CardDescription>Configure website preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-slate-600 dark:text-slate-400 mb-4'>
                Update site metadata, configure SEO settings, and manage general
                preferences.
              </p>
              <Button asChild className='w-full' variant='outline'>
                <Link href='/admin/settings'>Go to Settings</Link>
              </Button>
            </CardContent>
          </Card>*/}
        </div>

        {/* Quick Stats */}
        {/* <div className='mt-8'>
          <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
            Quick Stats
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700'>
              <div className='text-2xl font-bold text-slate-900 dark:text-white'>
                12
              </div>
              <div className='text-sm text-slate-500 dark:text-slate-400'>
                Published Articles
              </div>
            </div>
            <div className='bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700'>
              <div className='text-2xl font-bold text-slate-900 dark:text-white'>
                3
              </div>
              <div className='text-sm text-slate-500 dark:text-slate-400'>
                Admin Users
              </div>
            </div>
            <div className='bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700'>
              <div className='text-2xl font-bold text-slate-900 dark:text-white'>
                24
              </div>
              <div className='text-sm text-slate-500 dark:text-slate-400'>
                Total Visitors
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}
