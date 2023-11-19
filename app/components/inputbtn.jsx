'use client'
import {useState} from 'react'

export default function Inputbutton({text}) {

    const [value, setValue] = useState("")

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setValue(searchTerm)
    }

    return(
        <div>
            <p className="text-xl text-cherry">{text}</p>
            <div className='relative w-full h-[36px] rounded-[15px] border-1 border-white bg-lightpink flex gap-5 items-center shadow-lg'>
                <input className="w-full bg-transparent text-darkgrey placeholder-peach placeholder:text-left pl-5 pr-5 rounded-xl focus:ring-0 focus:ring-offset-0 " 
                    type="text" 
                    placeholder={text}
                    value={value} 
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}