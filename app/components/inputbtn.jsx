'use client'
import {useState} from 'react'

export default function Inputbutton({text, type='text', name='', isArea=0}) {

    const [value, setValue] = useState("")

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setValue(searchTerm)
    }

    return(
        <div>
            <p className="text-xl text-cherry">{text}</p>
                {isArea ? (
                <div className='w-full'> 
                    <textarea className="resize-none w-full h-20 rounded-[15px] border-1 border-white bg-lightpink items-center shadow-lg text-darkgrey placeholder-peach px-3 py-1"
                        name="description" 
                        placeholder={text}
                        value={value} 
                        onChange={handleInputChange}
                    />
                </div>
                ) : (
                <div className='w-full h-[36px] rounded-[15px] border-1 border-white bg-lightpink shadow-lg'>
                    <input 
                        className='bg-transparent w-full h-full rounded-xl px-3 text-darkgrey placeholder:text-peach focus:ring-0'
                        type={type}
                        placeholder={text}
                        value={value} 
                        onChange={handleInputChange}
                        name={name}
                    />
                </div>
                )}
        </div>
    );
}