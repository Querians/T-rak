import SignUpForm from '@/app/components/example/signup';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Signup() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    redirect('/tierlist/workspace');
  }

  console.log(data);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h>Sign Up</h>
      <SignUpForm />
    </main>
  );
}
