import React from "react";
import Image from "next/image";

export const CustomizeButton = ({onClick, text, styles,btType=""}) => {
    return (
      <>
        {styles == 'btnpeach' ? (
            <button
            className="h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-peach px-2 text-base text-white drop-shadow-md"
            onClick={onClick} 
            type={btType}
            >
                {text}
            </button>
        ) : (
          <></>
        )}

        {styles == 'btncherry' ? (
            <button
            className="h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-cherry px-2 text-base text-white drop-shadow-md"
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
            className="h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-winered px-2 text-base text-white drop-shadow-md"
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
            className="flex gap-2 items-center justify-center h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-peach px-2 text-base text-white drop-shadow-md"
            onClick={onClick} type={btType}
            >
                <Image
                src= "/iconPlus.svg"
                className="inline"
                alt="add text icon"
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
            className="flex gap-2 items-center justify-center h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-winered px-2 text-base text-white drop-shadow-md"
            onClick={onClick} type={btType}
            >
                <Image
                src= "/iconTrash.svg"
                className="inline"
                alt="delete icon"
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
          <form
          action='/api/auth/signout'
          method='post'
          className='w-full'
          >
            <button
              className="flex gap-2 items-center justify-center h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-winered text-base text-white drop-shadow-md"
              onClick={onClick} type={btType}
              >
                  <Image
                  src= "/iconLogout.svg"
                  className="inline"
                  alt="logout icon"
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