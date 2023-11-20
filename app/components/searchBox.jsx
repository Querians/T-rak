'use client'
import Image from 'next/image'
import {useState} from 'react'

export default function Searchbox({text}) {

    const [value, setValue] = useState("")

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setValue(searchTerm)
    }


    return(
            <div className='relative w-full h-[36px] rounded-[15px] border-1 
            border-white bg-lightpink flex gap-3 items-center
            px-5 shadow-lg'>
                <Image
                    src="/iconSearchcherry.svg"
                    alt="search icon"
                    width={19}
                    height={19}
                    priority
                />
                <input className="w-full bg-transparent text-darkgrey
                 placeholder-cherry placeholder:text-left pl-2 rounded-xl 
                 focus:ring-0 focus:ring-offset-0 " 
                        type="text" 
                        placeholder={text}
                        value={value} 
                        onChange={handleInputChange}
                    />
            </div>
    );
}