import React from 'react';
import Image from 'next/image';

export const CustomizeButton = ({
  onClick,
  text,
  styles,
  btType = '',
  isDisabled = false,
}) => {
  return (
    <>
      {styles == 'btnpeach' ? (
        <button
          className='border-littlepink h-[33px] w-full rounded-2xl border border-1 bg-peach px-2 text-base text-white drop-shadow-md'
          onClick={onClick}
          type={btType}
          disabled={isDisabled}
        >
          {text}
        </button>
      ) : (
        <></>
      )}

      {styles == 'btncherry' ? (
        <button
          className='border-littlepink h-[33px] w-full rounded-2xl border border-1 bg-cherry px-2 text-base text-white drop-shadow-md'
          onClick={onClick}
          type={btType}
        >
          {text}
        </button>
      ) : (
        <></>
      )}

      {styles == 'btnred' ? (
        <button
          className='border-littlepink h-[33px] w-full rounded-2xl border border-1 bg-winered px-2 text-base text-white drop-shadow-md'
          onClick={onClick}
          type={btType}
        >
          {text}
        </button>
      ) : (
        <></>
      )}

      {styles == 'addtextbtn' ? (
        <button
          className='border-littlepink flex h-[33px] w-full items-center justify-center gap-2 rounded-2xl border border-1 bg-peach px-2 text-base text-white drop-shadow-md'
          onClick={onClick}
          type={btType}
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

      {styles == 'deletebtn' ? (
        <button
          className='border-littlepink flex h-[33px] w-full items-center justify-center gap-2 rounded-2xl border border-1 bg-winered px-2 text-base text-white drop-shadow-md'
          onClick={onClick}
          type={btType}
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

      {styles == 'logoutbtn' ? (
        <form action='/api/auth/signout' method='post' className='w-full'>
          <button
            className='border-littlepink flex h-[33px] w-full items-center justify-center gap-2 rounded-2xl border border-1 bg-winered text-base text-white drop-shadow-md'
            onClick={onClick}
            type={btType}
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
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
