'use client'
import Image from "next/image";
import {useState} from 'react'

export default function ImageIcon ({img, imgName, tierRow, deleting}){
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')

    const handleOnClick = () => {
        setIsOpen(!isOpen)
    }
    const getValue = (rowID) => {
        setValue(rowID)
    }
    return(
        <div>
            <div className="border-1 w-[70px] h-[70px] rounded-2xl relative">
                <Image
                    src={img}
                    alt={imgName}
                    className='rounded-2xl object-cover cursor-pointer'
                    fill={true}
                    quality={100}
                    sizes="(max-width: 70px) 100vw, 33vw"
                    priority
                    onClick={handleOnClick}
                />
                 <div className='absolute -top-80 -right-[22px] h-[315px] flex text-sm'>
                    {isOpen && (
                        <div className="flex flex-col -space-y-[1px] justify-end">
                            <div className='bg-mint border-1 border-cream w-28 rounded-xl px-2 py-1 border-1 border-white overflow-auto shadow-lg text-center'>
                                <div className='divide-y-1 divide-darkgrey'>
                                    {
                                        tierRow.map((row) =>  
                                        <p className='text-darkgrey cursor-pointer' onClick={() => {getValue(row.id); handleOnClick()}}>{row.name}</p>)
                                    }
                                </div>
                            <p className="bg-winered rounded-xl my-1 p-[3px] border-1 border-red-200 text-white text-bold cursor-pointer" onClick={deleting}>Delete item</p>
                            </div>
                            <Image
                                src='/arrowDown.svg'
                                alt='arrowdown'
                                width={17}
                                height={13}
                                className="self-center"
                                />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}