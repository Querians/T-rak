import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

export default async function AuthLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data?.session?.user) {
    return redirect('/signin');
  }

  return (
    <div className='h-screen'>
      <p>Hi {JSON.stringify(data?.session?.user?.email)}</p>
      {children}

      <form
        action='/api/auth/signout'
        method='post'
        className='absolute top-0 flex w-full justify-end'
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
}
