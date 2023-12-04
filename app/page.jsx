import Image from 'next/image'
import Link from 'next/link';
import { CustomizeButton } from './components/inputComponent/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Image
        src="/logoTRak.svg"
        alt="T-Rak Logo"
        width={124}
        height={124}
        priority
      />
      <p className='text-3xl text-white font-bold'>T-rak</p>
      <p className='text-xl text-white'>sort your favourite</p>
      <Link
        href='/signin'
        className='mt-3 w-[80%]'
      >
          <CustomizeButton text='Get Start!' styles='btnpeach'/>
      </Link>
    </main>
  );
}
