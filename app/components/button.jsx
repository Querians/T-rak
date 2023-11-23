import React from "react";
import Image from "next/image";

export const CustomizeButton = ({onClick, text, styles }) => {
    return (
      <>
        {styles == 'btnpeach' ? (
            <button
            className="h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-peach px-2 text-base text-white drop-shadow-md"
            onClick={onClick} type="submit"
            >
                {text}
            </button>
        ) : (
          <></>
        )}

        {styles == 'btncherry' ? (
            <button
            className="h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-cherry px-2 text-base text-white drop-shadow-md"
            onClick={onClick} type="submit"
            >
                {text}
            </button>
        ) : (
          <></>
        )}

       
        {styles == 'addtextbtn' ? (
            <button
            className="flex gap-2 items-center justify-center h-[33px] w-full rounded-2xl border border-1 border-littlepink bg-peach px-20 py-2 text-base font-bold text-white drop-shadow-md"
            onClick={onClick} type="submit"
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
            className="flex gap-2 items-center justify-center h-fit w-full rounded-[0.625rem] border border-1 border-littlepink bg-winered px-20 py-2 text-base font-bold text-white drop-shadow-md"
            onClick={onClick} type="submit"
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

        {styles == 'logoutbtn' ? (
            <button
            className="flex gap-2 items-center justify-center h-fit w-full rounded-[0.625rem] border border-1 border-littlepink bg-winered px-20 py-2 text-base font-bold text-white drop-shadow-md"
            onClick={onClick} type="submit"
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