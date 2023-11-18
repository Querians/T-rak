import Image from 'next/image'

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
    </main>
  );
}
