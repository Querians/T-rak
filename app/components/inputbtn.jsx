'use client'
import {useState} from 'react'

export default function Inputbutton({text, type='text', name='',read=0}) {

    const [value, setValue] = useState("")

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setValue(searchTerm)
    }

    return(
        <div>
            <p className="text-xl text-cherry">{text}</p>
            <div className='w-full h-[36px] rounded-[15px] border-1 border-white bg-lightpink flex gap-5 items-center shadow-lg'>
                <input 
                    className='bg-transparent w-full h-full rounded-xl px-3 text-darkgrey placeholder:text-peach focus:ring-sky-500 focus:ring-1'
                    type={type}
                    placeholder={text}
                    value={value} 
                    onChange={handleInputChange}
                    name={name}
                    readOnly={(read)?0:1}
                />
            </div>
        </div>
    );
}