'use client';
import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { data } from './data';
import TierList from '@/app/components/tierList';

export default function EditTierList() {
  const [items, setItems] = useState(data);
  const [isEditable, setisEditable] = useState(false);

  useEffect(() => {
    console.log('asd', items);
  }, [items]);

  return (
    <div className='flex flex-col overflow-auto'>
      <div className='bg-blue-400'>
        <button
          onClick={() => {
            setisEditable(!isEditable);
          }}
        >
          {!isEditable ? 'edit' : 'back'}
        </button>
      </div>
      <TierList items={items} setItems={setItems} isEditable={isEditable} />
    </div>
  );
}
