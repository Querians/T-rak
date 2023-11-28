'use client';
import { useState } from 'react';
import Image from "next/image";

export default function Inputtypefile({text}) {

  return (
    <div>
      <p className='text-xl text-cherry'> {text}</p>
      <br />
      <div  className="flex justify-center items-center">
        <label>
            <input
                type='file'
                style = {{'display':'none'}} 
            />
            <Image
                    src= "/iconInputFilebtn.svg"
                    className=" inline"
                    alt="add text icon"
                    width={81}
                    height={81}
                    quality={100}
            />
        </label>
      </div>
    </div>
  );
}