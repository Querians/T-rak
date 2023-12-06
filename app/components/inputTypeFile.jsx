'use client';
import { useState } from 'react';
import {Avatar} from "@nextui-org/react";

export default function Inputtypefile({text, type, className, param, read = 0, name ='', isRequired = false, handleChange }) {

  return (
    <>
    {read == 0 || type == 'preview' ? (
    <div>
    <p className='text-xl text-cherry'> {text}</p>
        <div className="flex justify-center items-center" name = {name} >
            <Avatar 
              showFallback
              src={param}
              alt="imageInput" 
              className={className}
              readOnly={read ? 0 : 1}
            />
       </div>
     </div>
    ) : (
      <></>
    )}

  {read == 1 || type == 'edit' ? (
       <div>
       <p className='text-xl text-cherry'> {text}</p>
 
       <div className="flex justify-center items-center">
 
          <label className='overflow-hidden w-[90px] rounded-full relative'>
            <Avatar 
              showFallback
              src={param}
              alt="imageInput" 
              className={className}
            />

            <span className='absolute bottom-0 h-[30px] w-[90px] bg-lightpink text-center text-lg text-cherry'
            clipPath= "circle(50%)">
              Edit
            </span>  
            <input
                 required = {isRequired}
                 name = {name}
                 type='file'
                 accept='.jpeg, .png, .jpg'
                 className='opacity-0 inline absolute bottom-0'
                 onChange = {handleChange}
             />       
          </label>
 
       </div>
     </div>
    ) : (
      <></>
    )}
  </>

  );
}

