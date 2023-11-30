'use client';
import Header from '@/app/components/header';
import ElementCard from '@/app/components/elementCard';
import Spawner from '@/app/components/spawner';
import { useState, useEffect } from 'react';
import { data } from '../data';
import {
  DndContext,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  handleDragEnd,
  handleDragStart,
  handleRemoveElement,
} from '@/utils/tierList/handler';
import Image from 'next/image';
import RowDragable from '@/app/components/rowDragable';

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export default function EditExpand({ params }) {
  const [items, setItems] = useState([
    {
      id: params.rowId,
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
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className='relative flex h-screen w-full flex-col overflow-hidden'>
      <Header
        isEditExpand={true}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        resetItems={() => {
          setTempItems(items);
        }}
        saveItems={() => {
          setItems(tempItems);
        }}
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
