import Image from 'next/image';
import Link from 'next/link';

export default function TierlistCard({
  pic,
  tierlistName,
  category,
  link = '',
}) {
  return (
    <>
      <Link href={link}>
        <div className='flex h-[90px] w-full gap-3 truncate rounded-2xl border-1 border-stone-200 bg-[#F1EEE7] shadow-lg'>
          <div className='relative flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-l-2xl rounded-r-md bg-lightpink shadow-lg'>
            <div className='relative h-[70px] w-[70px] shrink-0'>
              <Image
                src={pic}
                alt='TierList picture'
                sizes='70px'
                fill={true}
                className='rounded-lg object-cover'
                priority={true}
              />
            </div>
          </div>
          <div className='flex w-full flex-col justify-center gap-1'>
            <p className='max-w-[190px] truncate text-lg text-darkgrey sm:max-w-none'>
              {tierlistName}
            </p>
            <p className='text-md max-w-[190px] truncate text-darkgrey sm:max-w-none'>
              {category}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
