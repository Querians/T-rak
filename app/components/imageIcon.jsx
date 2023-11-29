'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageIcon(props) {
  const { img, imgName, tierRow, onRemove } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Image
        src={img}
        alt={imgName}
        className='cursor-pointer rounded-2xl object-cover'
        fill={true}
        quality={100}
        sizes='(max-width: 70px) 100vw, 33vw'
        priority
        tabIndex='0'
        onClick={handleOnClick}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 50);
        }}
      />

      <div
        className={`absolute -right-[22px] -top-80 z-30 flex h-[315px] text-sm`}
      >
        {isOpen && (
          <div className='flex flex-col justify-end -space-y-[1px]'>
            <div
              className={`z-30 w-28 overflow-auto rounded-xl border-1 border-cream bg-mint px-2 py-1 text-center shadow-lg`}
            >
              <div className='divide-y-1 divide-darkgrey'>
                {tierRow.map((row, index) => (
                  <button
                    key={index}
                    className='w-full cursor-pointer text-darkgrey'
                    onClick={() => {
                      props?.handleSelectRow(row.id, props.elementId);
                      handleOnClick();
                    }}
                  >
                    {row.label}
                  </button>
                ))}
              </div>
              <p
                className='text-bold my-1 cursor-pointer rounded-xl border-1 border-red-200 bg-winered p-[3px] text-white'
                onClick={() => {
                  onRemove(props.elementId, props.rowIndex);
                }}
              >
                Delete item
              </p>
            </div>
            <Image
              src='/arrowDown.svg'
              alt='arrowdown'
              width={17}
              height={13}
              priority
              className={`self-center `}
            />
          </div>
        )}
      </div>
    </>
  );
}
