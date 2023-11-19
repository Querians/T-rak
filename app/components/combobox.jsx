'use client'
import Image from 'next/image'
import {useState} from 'react'

export function DropButton({onClick, open}) {
    return(
        <div onClick={onClick} className="bg-cherry w-10 h-[1.625rem] rounded-[0.625rem] border-1 border-[#ECB7BD] relative flex justify-center cursor-pointer shadow-md" >
            <Image
                src="/toggle.svg"
                alt="Toggle"
                width={17.38}
                height={8.69}
                priority
                className={`${(open==0) ? '':'rotate-180'}`}
            />
        </div>
    );
}

export default function Combobox({data}) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("")
    const [filteredCategory, setFilteredCategory] = useState(data)

    const handleOnClick = () => {
        setTimeout(function() {
            setIsOpen(!isOpen)
        }, 150)
    }

    const getValue = (category) => {
        setValue(category)

        const filteredItems = data.filter((dataCategory) =>
            dataCategory.name.toLowerCase().includes(category.toLowerCase())
        );
        setFilteredCategory(filteredItems)
    }

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setValue(searchTerm)
          
        const filteredItems = data.filter((dataCategory) =>
            dataCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategory(filteredItems)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
            setIsOpen(false)
        }
    }

    return(
        <div className="w-72 h-[70px] flex flex-col">
            <p className="text-xl text-cherry">Category</p>
            <div className='relative h-9 rounded-2xl border-1 border-white bg-lightpink flex gap-2 items-center px-2 shadow-lg'>
                <input className="w-full bg-transparent text-darkblack placeholder-peach pl-3 rounded-xl focus:ring-0 focus:ring-offset-0" 
                        type="text" 
                        placeholder="Category" 
                        value={value} 
                        onFocus={() => {if(isOpen == false) {setIsOpen(true)}}}
                        onBlur={handleOnClick}
                        onChange={handleInputChange} 
                        onKeyDown={handleEnter}/>
                <DropButton onClick={handleOnClick} open={isOpen}/>
                <div className='absolute -bottom-[7.5rem] right-0 h-28 justify-start'>
                    {isOpen && (
                        <div className='bg-cream  w-[213px] max-h-28 rounded-xl px-[11px] py-1 border-1 border-white overflow-auto shadow-lg'>
                            {filteredCategory.length === 0
                                ? <p className='text-darkblack'>Not found</p>
                                : <div className='divide-y-1 divide-darkblack'>
                                {
                                    filteredCategory.map((choice) =>  
                                    <p className='text-darkblack cursor-pointer' onClick={() => {getValue(choice.name); handleOnClick()}}>{choice.name}</p>)
                                }
                               </div>
                            }   
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}