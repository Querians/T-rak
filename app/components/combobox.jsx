'use client'
import Image from 'next/image'
import {useState} from 'react'
import Combobox from 'react-widgets/Combobox';

export function DropButton({onClick}) {
    return(
        <div onClick={onClick} className="bg-cherry w-10 h-[1.625rem] rounded-[0.625rem] border-1 border-[#ECB7BD] relative flex justify-center cursor-pointer" >
            <Image
                src="/toggle.svg"
                alt="Toggle"
                width={17.38}
                height={8.69}
                priority
            />
        </div>
    );
}

export default function AutoBox({data}) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("")
    const handleOnClick = () => {
        setIsOpen(!isOpen)
    }
    const getValue = (category) => {
        setValue(category)
        console.log(category)
    }

    return(
        <div className="bg-black w-72 h-[70px] flex flex-col">
            <p className="text-xl text-cherry">Category</p>
            <div className='h-9 rounded-xl border-1 border-white bg-lightpink flex gap-2 items-center px-2 relative'>
                <input className="w-full bg-transparent text-darkblack placeholder-peach pl-3 rounded-xl" type="text" placeholder="Category" value={value} onChange={event => {setValue(event.target.value)}}/>
                <DropButton onClick={handleOnClick}/>
                {isOpen && (
                    <div className='absolute right-0 -bottom-[7.5rem] bg-cream  w-[213px] h-28 rounded-xl px-[11px] py-1 divide-y-1 divide-darkblack overflow-auto'>
                        {
                            data.map((choice) =>  
                                <p className='text-darkblack' onClick={() => {getValue(choice.name); handleOnClick()}}>{choice.name}</p>)
                        }
                    </div>
                )}
            </div>
            {/* <Combobox
                containerClassName="text-base rounded-md drop-shadow-md"
                defaultValue="Category"
                data={["Red", "Yellow", "Blue", "Orange"]}
            /> */}
        </div>
    );
}