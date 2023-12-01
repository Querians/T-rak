import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignUpForm from '@/app/components/signUp';
import Image from 'next/image';

export default async function Signup() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    redirect('/tierlist/home');
  }

  console.log(data);

  return (
     <main className='flex flex-col h-screen w-full'>
      <div className='h-[22%] w-full pt-10 gap-[45px] flex items-center justify-center'>
        <Image
          src= "/logoTRak.svg"
          alt="logo"
          width={80}
          height={80}
          quality={100}
        />
        <div className='flex flex-col'>
          <p className='text-3xl text-white font-bold'>T-rak</p>
          <p className='text-xl text-white'>sort your favourite</p> 
        </div>
      </div>
      <div className='h-[78%] p-8 bg-cream rounded-t-2xl'>
        <SignUpForm />
      </div>
   </main>
  );
}
