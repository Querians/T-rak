'use client';
import { useState } from 'react';
import {Avatar} from "@nextui-org/react";

export default function Inputtypefile({text,type,className,param, read = 0 }) {

  const [file, setFile] = useState();

  const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  
  return (
    <>
    {read == 0 || type == 'preview' ? (
    <div>
    <p className='text-xl text-cherry'> {text}</p>
        <div className="flex justify-center items-center">
            <Avatar 
              showFallback
              src={file||param}
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
 
         <label>

          <div className='overflow-hidden w-[90px] rounded-full relative'>
          <Avatar 
             showFallback
             src={file}
             alt="imageInput" 
             className={className}
           />

           <span className='absolute bottom-0 h-[30px] w-[90px] bg-lightpink text-center text-lg text-cherry'
           clip-path= "circle(50%)">
            Edit
           </span>
                    
          </div>
           
             <input
                 type='file'
                 accept='.jpeg, .png, .jpg'
                 style = {{'display':'none'}} 
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

