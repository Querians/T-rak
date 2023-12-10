import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignUpForm from '@/app/components/formInput/signUp';
import Image from 'next/image';
import Link from 'next/link';

export default async function Signup() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    redirect('/home');
  }

  console.log(data);

  return (
    <main className='relative flex h-screen w-full flex-col'>
      <Link href='/signin' className='absolute left-5 top-9'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='39'
          height='39'
          viewBox='0 0 39 39'
          fill='none'
        >
          <g filter='url(#filter0_d_1794_2378)'>
            <rect x='4' width='31' height='31' rx='8' fill='#F8EBEF' />
            <rect x='9' y='6' width='20' height='20' fill='#A73440' />
            <path
              d='M25.5755 1H13.4245C8.1465 1 5 4.1465 5 9.4245V21.561C5 26.8535 8.1465 30 13.4245 30H25.561C30.839 30 33.9855 26.8535 33.9855 21.5755V9.4245C34 4.1465 30.8535 1 25.5755 1ZM22.284 21.4885H15.15C14.5555 21.4885 14.0625 20.9955 14.0625 20.401C14.0625 19.8065 14.5555 19.3135 15.15 19.3135H22.284C24.14 19.3135 25.6625 17.8055 25.6625 15.935C25.6625 14.0645 24.1545 12.5565 22.284 12.5565H14.9325L15.3095 12.9335C15.73 13.3685 15.73 14.05 15.295 14.485C15.0775 14.7025 14.802 14.804 14.5265 14.804C14.251 14.804 13.9755 14.7025 13.758 14.485L11.4815 12.194C11.061 11.7735 11.061 11.0775 11.4815 10.657L13.758 8.3805C14.1785 7.96 14.8745 7.96 15.295 8.3805C15.7155 8.801 15.7155 9.497 15.295 9.9175L14.8165 10.396H22.284C25.3435 10.396 27.8375 12.89 27.8375 15.9495C27.8375 19.009 25.3435 21.4885 22.284 21.4885Z'
              fill='#F6D8DF'
            />
          </g>
          <defs>
            <filter
              id='filter0_d_1794_2378'
              x='0'
              y='0'
              width='39'
              height='39'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='4' />
              <feGaussianBlur stdDeviation='2' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_1794_2378'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_1794_2378'
                result='shape'
              />
            </filter>
          </defs>
        </svg>
      </Link>
      <div className='flex h-[22%] w-full items-center justify-center gap-[45px] pt-10'>
        <Image
          src='/logoTRak.svg'
          alt='logo'
          width={80}
          height={80}
          quality={100}
          priority={true}
        />
        <div className='flex flex-col'>
          <p className='text-3xl font-bold text-white'>T-rak</p>
          <p className='text-xl text-white'>sort your favourite</p>
        </div>
      </div>
      <div className='h-[78%] rounded-t-2xl bg-cream p-8'>
        <SignUpForm />
      </div>
    </main>
  );
}
