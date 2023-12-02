'use client';
import { useState, useEffect, useRef } from 'react';
import { data } from './data';
import MenuBar from '@/app/components/menuBar';
import Header from './header';
import dynamic from 'next/dynamic';

const TierList = dynamic(() => import('@/app/components/tierList'), {
  ssr: false,
});

export default function CurrentTierList({ params }) {
  const [items, setItems] = useState(data);
  // for editing
  const [tempItems, setTempItems] = useState(data);
  const [isEditable, setIsEditable] = useState(false);
  // for exporting
  const [isExporting, setIsExporting] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    console.log('items:', items);
  }, [items]);
  useEffect(() => {
    if (isExporting) {
      setTimeout(() => {
        setIsExporting(false);
      }, 1);
    }
  }, [isExporting]);

  return (
    <div className='relative flex h-screen w-full flex-col overflow-hidden'>
      <Header
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        export={async () => {
          const { exportComponentAsJPEG } = await import(
            'react-component-export-image'
          );
          setIsExporting(true);
          setTimeout(() => {
            exportComponentAsJPEG(componentRef);
          }, 1);
        }}
        resetItems={() => {
          setTempItems(items);
        }}
        saveItems={() => {
          setItems(tempItems);
        }}
        tierListId={params.tierListId}
      />
      <div className='flex h-[78%] shrink-0 grow-0 flex-col items-center gap-y-[22px] rounded-t-[20px] bg-cream px-4 py-[27px]'>
        <div
          ref={componentRef}
          className={`${
            isExporting
              ? 'w-fit'
              : 'h-[95%] w-full touch-auto snap-y overflow-y-auto scroll-auto'
          }`}
        >
          <TierList
            originalLength={items.length}
            isExporting={isExporting}
            tierListId={params.tierListId}
            items={isEditable ? tempItems : items}
            setItems={isEditable ? setTempItems : setItems}
            isEditable={isEditable}
            className={`flex flex-col gap-y-2.5 px-1 transition-[height] ${
              !isEditable ? 'h-5/6 ' : 'h-3/4 overflow-y-auto'
            }  w-full shrink-0 py-2.5`}
          />
        </div>
        <div className={`h-1/6 shrink-0 ${isEditable && 'hidden'}`}>
          <MenuBar type={'home'} />
        </div>
      </div>
    </div>
  );
}
