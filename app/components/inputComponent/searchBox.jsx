'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Searchbox({ text, handleChange }) {
  return (
    <div
      className='relative flex h-[36px] w-full items-center 
            gap-3 rounded-[15px] border-1 border-white bg-lightpink
            px-5 shadow-lg'
    >
      <Image
        src='/iconSearchcherry.svg'
        alt='search icon'
        width={0}
        height={0}
        className='h-[19px] w-[19px]'
        priority
      />
      <input
        className='w-full rounded-xl bg-transparent
                 pl-2 text-darkgrey placeholder-cherry placeholder:text-left 
                 focus:ring-0 focus:ring-offset-0 '
        type='text'
        placeholder={text}
        // value={value}
        onChange={handleChange}
      />
    </div>
  );
}
