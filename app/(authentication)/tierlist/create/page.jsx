'use client';
import Image from 'next/image';
import TierListForm from '@/app/components/formInput/createtierlist';
import Inputtypefile from '@/app/components/inputTypeFile';
import { useState } from 'react';
import Profile from './profile';

export default function CreateTierlist() {
  return (
    <main className='flex min-h-screen w-full flex-col'>
      <div className='justify-left flex h-[18%] w-full items-center gap-[15px] px-8 pt-10'>
        <Profile />
        <p className='text-2xl text-white '>Create New Tier-list</p>
      </div>
      <div className='h-5/6 rounded-t-2xl bg-cream p-8'>
        <TierListForm />
      </div>
    </main>
  );
}
