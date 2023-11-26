'use client';
import { useState, useEffect } from 'react';
import { data } from './data';
import TierList from '@/app/components/tierList';
import MenuBar from '@/app/components/menuBar';
import Header from '@/app/components/header';

export default function CurrentTierList({ params }) {
  const [items, setItems] = useState(data);
  // for editing
  const [tempItems, setTempItems] = useState(data);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    console.log('asd', items);
  }, [items]);
  // console.log('param', params);

  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <Header
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        resetItem={() => {
          setTempItems(items);
        }}
        tierListId={params.tierListId}
      />
      <div className='flex h-[78%] shrink-0 grow-0 flex-col items-center gap-y-[22px] rounded-t-[20px] bg-cream px-4 py-[27px]'>
        <TierList
          items={isEditable ? tempItems : items}
          setItems={isEditable ? setTempItems : setItems}
          isEditable={isEditable}
          className={`flex flex-col gap-y-2.5 px-1 transition-[height] ${
            !isEditable ? 'h-5/6 ' : 'h-3/4 '
          }  w-full shrink-0 overflow-y-auto py-2.5`}
        />
        <div className={`h-1/6 shrink-0 ${isEditable && 'hidden'}`}>
          <MenuBar type={'home'} />
        </div>
      </div>
    </div>
  );
}
