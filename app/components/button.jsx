import React from "react";
import Image from "next/image";
// ***import style*** //

export const Button = ({onClick, text, type }) => {
    return (
      <>
        {type == 'btnpeach' ? (
            <button
            className="h-fit w-full rounded-full border border-1 border-littlepink bg-peach px-20 py-2 text-base font-bold text-white drop-shadow-md"
            onClick={onClick}
            >
                {text}
            </button>
        ) : (
          <></>
        )}

        {type == 'btncherry' ? (
            <button
            className="h-fit w-full rounded-full border border-1 border-littlepink bg-cherry px-20 py-2 text-base font-bold text-white drop-shadow-md"
            onClick={onClick}
            >
                {text}
            </button>
        ) : (
          <></>
        )}

       
        {type == 'addtextbtn' ? (
            <button
            className="flex gap-2 items-center justify-center h-fit w-full rounded-full border border-1 border-littlepink bg-peach px-20 py-2 text-base font-bold text-white drop-shadow-md"
            onClick={onClick}
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
        

        {type == 'deletebtn' ? (
            <button
            className="flex gap-2 items-center justify-center h-fit w-full rounded-full border border-1 
            border-littlepink bg-winered px-20 py-2 text-base 
            font-bold text-white drop-shadow-md"
            onClick={onClick}
            >
                <Image
                src= "/iconTrash.svg"
                className="inline"
                alt="delete icon"
                width={20}
                height={20}
                quality={100}
                />
                Delete
            </button>
        ) : (
          <></>
        )}

        {type == 'logoutbtn' ? (
            <button
            className="flex gap-2 items-center justify-center h-fit w-full rounded-full border border-1 
            border-littlepink bg-winered px-20 py-2 text-base 
            font-bold text-white drop-shadow-md"
            onClick={onClick}
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
        ) : (
          <></>
        )}
      </>
    );
};