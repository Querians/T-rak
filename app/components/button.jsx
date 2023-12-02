import React from 'react';
import Image from 'next/image';
// ***import style*** //

export const Button = ({ onClick, text, type }) => {
  return (
    <>
      {type == 'btnpeach' ? (
        <button
          className='border-littlepink h-fit w-full rounded-[0.625rem] border-1 bg-peach py-2 text-base font-bold text-white drop-shadow-md'
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <></>
      )}

      {type == 'btncherry' ? (
        <button
          className='border-littlepink h-fit w-full rounded-[0.625rem] border-1 bg-cherry px-20 py-2 text-base font-bold text-white drop-shadow-md'
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <></>
      )}

      {type == 'addtextbtn' ? (
        <button
          className='border-littlepink flex h-fit w-full items-center justify-center gap-2 rounded-full border-1 bg-peach py-1 text-base font-bold text-white drop-shadow-md'
          onClick={onClick}
        >
          <Image
            src='/iconPlus.svg'
            className='inline'
            alt='add text icon'
            width={20}
            height={20}
            quality={100}
          />
          {text}
        </button>
      ) : (
        <></>
      )}

      {type == 'deletebtn' ? (
        <button
          className='border-littlepink flex h-fit w-full items-center justify-center gap-2 rounded-[0.625rem] border-1 bg-winered py-2 text-base font-bold text-white drop-shadow-md'
          onClick={onClick}
        >
          <Image
            src='/iconTrash.svg'
            className='inline'
            alt='delete icon'
            width={20}
            height={20}
            quality={100}
          />
          Delete {text}
        </button>
      ) : (
        <></>
      )}

      {type == 'redbtn' ? (
        <button
          className='border-littlepink flex h-fit w-full items-center justify-center gap-2 rounded-[0.625rem] border-1 bg-winered py-2 text-base font-bold text-white drop-shadow-md'
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <></>
      )}

      {type == 'logoutbtn' ? (
        <button
          className='border-littlepink flex h-fit w-full items-center justify-center gap-2 rounded-[0.625rem] border-1 bg-winered px-20 py-2 text-base font-bold text-white drop-shadow-md'
          onClick={onClick}
        >
          <Image
            src='/iconLogout.svg'
            className='inline'
            alt='logout icon'
            width={20}
            height={20}
            quality={100}
          />
          Logout
        </button>
      ) : (
        <></>
      )}
    </>
  );
};
