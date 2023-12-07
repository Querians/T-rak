'use client';
import Searchbox from '@/app/components/inputComponent/searchBox';
import MenuBar from '@/app/components/menuComponent/menuBar';
import { useState } from 'react';
import Profile from './profile';
import TierListCards from './TierListCards';

export default function Home() {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);
  };

  return (
    <div className='flex h-screen flex-col justify-between '>
      <div className='flex flex-col gap-4 px-8 pt-8'>
        <Profile />
        <Searchbox text='Search' handleChange={handleInputChange} />
      </div>
      <div className='mt-4 flex h-3/4 flex-col items-center gap-4 rounded-t-[20px] bg-cream px-6 pb-8 pt-4'>
        <div className='h-[85%] w-full overflow-y-auto rounded-2xl p-1 pb-2'>
          <TierListCards value={value} />
        </div>
        <div className='pb-2'>
          <MenuBar type='home' />
        </div>
      </div>
    </div>
  );
}
