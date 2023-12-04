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
    <main className='flex flex-col h-screen w-full'>
      <div className='h-[40%] w-full pt-10 flex flex-col items-center justify-center'>
        <Image
          src= "/logoTRak.svg"
          alt="logo"
          width={110}
          height={110}
          quality={100}
        />
        <p className='text-3xl text-white font-bold'>T-rak</p>
        <p className='text-xl text-white'>sort your favourite</p> 
      </div>
      <div className='h-[60%] p-8 bg-cream rounded-t-2xl'>
        <SignInForm />
      </div>
    </main>
  );
}
