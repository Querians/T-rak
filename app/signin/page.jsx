import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignInForm from '../components/formInput/signIn';
import Image from 'next/image';

export default async function Signin() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    redirect('/home');
  }

  console.log(data);

  return (
    <main className='flex h-screen w-full flex-col'>
      <div className='flex h-[40%] w-full flex-col items-center justify-center pt-10'>
        <Image
          src='/logoTRak.svg'
          alt='logo'
          width={110}
          height={110}
          quality={100}
          priority={true}
        />
        <p className='text-3xl font-bold text-white'>T-rak</p>
        <p className='text-xl text-white'>sort your favourite</p>
      </div>
      <div className='h-[60%] rounded-t-2xl bg-cream p-8'>
        <SignInForm />
      </div>
    </main>
  );
}
