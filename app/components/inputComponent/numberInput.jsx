'use client';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

export function DropButton({ onClick, symbol, value }) {
  return (
    <Button
      onClick={onClick}
      isDisabled={
        (value == 1 && symbol == 'minus') || (value == 8 && symbol == 'add')
      }
      isIconOnly={true}
      className='relative flex h-[26px] cursor-pointer justify-center rounded-[10px] border-1 border-[#ECB7BD] bg-cherry shadow-lg disabled:bg-peach'
    >
      <Image
        src={`${symbol == 'add' ? '/addCream.svg' : '/minusCream.svg'}`}
        alt={`${symbol == 'add' ? 'add' : 'minus'}`}
        width={0}
        height={0}
        className='h-[16px] w-[16px]'
      />
    </Button>
  );
}

export default function NumberInput({ text, rowcount = 1, name }) {
  const [count, setCount] = useState(rowcount);
  const max = 8;

  const adding = () => {
    // setCount(count + 1)
    if (count + 1 <= max) {
      setCount(count + 1);
    }
  };

  const subtracting = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className='flex h-[70px] w-full flex-col'>
      <p className='text-xl text-cherry'>{text}</p>
      <div className='flex h-9 items-center justify-between rounded-2xl border-1 border-white bg-lightpink px-5 shadow-lg'>
        <DropButton onClick={subtracting} symbol='minus' value={count} />
        <div className='w-10 text-center'>
          <input
            onClick={(e) => e.preventDefault()}
            tabIndex='-1'
            name={name}
            value={count}
            readOnly={true}
            className='align-center inline bg-transparent text-base text-darkgrey focus:outline-none'
          />
        </div>
        <DropButton onClick={adding} symbol='add' value={count} />
      </div>
    </div>
  );
}
