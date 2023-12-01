'use client';
import Header from './header';
import { useState, useEffect } from 'react';
import RowDragable from '@/app/components/rowDragable';
import { data } from '../data';

export default function EditExpand({ params }) {
  // items = [chosenRow, spawnerRow(a row that has Id = -1)]
  const [items, setItems] = useState([
    {
      id: params.rowId,
      label: 'some label',
      elements: [
        {
          id: '1',
          title: 'Anime You1',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '2',
          title: 'Anime You2',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '3',
          title: 'Anime You3',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '4',
          title: 'Anime You4',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '5',
          title: 'Anime You5',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '6',
          title: 'Anime You6',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '7',
          title: 'Anime You7',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '8',
          title: 'Anime You8',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '9',
          title: 'Anime You9',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
        {
          id: '10',
          title: 'Anime You10',
          pictureUrl: '/vercel.svg',
          toShowSrc: '/vercel.svg',
        },
      ],
    },
    data[data.length - 1],
  ]);
  const [tempItems, setTempItems] = useState(items);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className='relative flex h-screen w-full flex-col overflow-hidden'>
      <Header
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        resetItems={() => {
          setTempItems(items);
        }}
        saveItems={() => {
          setItems(tempItems);
        }}
        tierListId={params.tierListId}
        rowId={params.rowId}
        data={items}
      />
      <div className='h-[78%] shrink-0 grow-0  rounded-t-[20px] bg-cream'>
        <RowDragable
          items={tempItems}
          setItems={setTempItems}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
}
