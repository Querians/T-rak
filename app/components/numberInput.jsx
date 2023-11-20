'use client'
import Image from 'next/image'
import { Button } from '@nextui-org/react';
import {useState} from 'react'

export function DropButton({onClick, symbol, value}) {
    return(
        <Button 
            onClick={onClick} 
            isDisabled={((value==1 && symbol=='minus')||(value==8 && symbol=='add'))} 
            isIconOnly={true} 
            className='bg-cherry h-[26px] rounded-[10px] border-1 border-[#ECB7BD] relative flex justify-center cursor-pointer shadow-lg disabled:bg-peach border-stone-100' >
            <Image
                src={`${(symbol=='add') ? "/addCream.svg":"/minusCream.svg"}`}
                alt={`${(symbol=='add') ? "add":"minus"}`}
                width={16}
                height={16}
            />
        </Button>
    );
}

export default function NumberInput({data, text}) {
    const [count, setCount] = useState(1);
    const max=8

    const adding = () => {
        // setCount(count + 1)
        if (count+1 <= max) {
          setCount(count + 1)
        };
      };
    
    const subtracting = () => {
    if (count > 1) {
        setCount(count - 1)
    };
    };

    return(
        <div className="w-full h-[70px] flex flex-col">
            <p className="text-xl text-cherry">{text}</p>
            <div className='h-9 rounded-2xl border-1 border-white bg-lightpink flex items-center justify-between px-5 shadow-lg'>
                <DropButton onClick={subtracting} symbol='minus' value={count}/>
                <div className="text-center w-10">
                    <p className="align-center text-base text-darkgrey">{count}</p>
                </div>
                <DropButton onClick={adding} symbol='add' value={count}/>
            </div>
        </div>
    );
}