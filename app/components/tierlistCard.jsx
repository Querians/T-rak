import Image from 'next/image';
import Link from 'next/link';
// import {Image} from "@nextui-org/react";
// import NextImage from "next/image";

export default function TierlistCard({
  pic,
  tierlistName,
  category,
  link = '',
}) {
  return (
    <>
      <Link href={link}>
        <div className='flex h-[90px] w-full gap-3 rounded-2xl border-1 border-stone-200 bg-[#F1EEE7] shadow-lg'>
          <div className='relative flex h-[90px] w-[90px] items-center justify-center rounded-l-2xl rounded-r-md bg-lightpink shadow-lg'>
            <div className='relative h-[70px] w-[70px]'>
              <Image
                // as={NextImage}
                src={pic}
                alt='TierList picture'
                // placeholder="blur"
                // width={70}
                // height={70}
                fill={true}
                className='rounded-lg object-cover'
              />
            </div>
          </div>
          <div className='flex flex-col justify-center gap-1'>
            <p className='text-lg text-darkgrey'>{tierlistName}</p>
            <p className='text-md text-darkgrey'>{category}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
