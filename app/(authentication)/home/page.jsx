'use client'
import Searchbox from "@/app/components/inputComponent/searchBox";
import Image from "next/image";
import Avartar from "@/app/components/avartar"; {/* profile here!! */}
import MenuBar from "@/app/components/menuComponent/menuBar";
import TierlistCard from "@/app/components/tierlistCard";
import Link from "next/link";
import { useState } from "react";

const tierlistChoice =[
    {
        id: '1',
        name: 'Food Anime',
        picture: '/arrowDown.svg',
        category: 'Anime',
    },
    {
        id: '2',
        name: 'Chinese Anime',
        picture: '/arrowDown.svg',
        category: 'Anime',
    },
    {
        id: '3',
        name: 'Sweet',
        picture: '/arrowDown.svg',
        category: 'Food',
    },
    {
        id: '4',
        name: 'Japan Anime',
        picture: '/arrowDown.svg',
        category: 'Anime',
    },
    {
        id: '5',
        name: 'Chinese Food',
        picture: '/arrowDown.svg',
        category: 'Food',
    },
    {
        id: '6',
        name: 'Thai Anime',
        picture: '/arrowDown.svg',
        category: 'Anime',
    },
    {
        id: '7',
        name: 'Thai Food',
        picture: '/arrowDown.svg',
        category: 'Food',
    },
]

export default function Home() {
    const name ='Parewa'
    const [value,setValue] = useState('')
    const [filteredCategory, setFilteredCategory] = useState(tierlistChoice)

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setValue(searchTerm)
          
        const filteredItems = tierlistChoice.filter((dataCategory) =>
            dataCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategory(filteredItems)
    }

    return (
      <div className='flex flex-col justify-between h-screen gap-4'>
        <div className="px-8 pt-8 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="bg-cream rounded-full w-[70px] h-[70px] shadow-lg">
                    {/* profile here!! */}
                    <Avartar /> 
                </div>
                <Image
                    src="/logoTRak.svg"
                    alt="T-Rak Logo"
                    width={65}
                    height={65}
                    priority
                />
            </div>
            <p className="text-white text-lg">Nice to see you, <span className="font-bold">{name} </span>!</p>
            <Searchbox text='Search' handleChange={handleInputChange}/>
        </div>
        <div className="bg-cream h-3/4 rounded-t-[20px] flex flex-col items-center px-6 pt-4 pb-8 gap-4">
            <div className="h-[85%] w-full overflow-y-auto pb-2 rounded-2xl p-1">
                {filteredCategory.length === 0
                    ? <div className='text-winered text-center p-8 flex flex-col gap-2'>
                        <p className="font-bold">;-;</p>
                        <p className=''>Sorry, we couldn't find what you're looking for.</p>
                      </div>
                    : <div className='flex flex-col gap-2.5 '>
                    {
                        filteredCategory.map((choice) =>  
                            <TierlistCard pic={choice.picture} tierlistName={choice.name} category={choice.category} link='/'/>)
                    }
                    </div>
                } 
            </div>
            <div className="pb-2">
                <MenuBar type='home'/>
            </div>
        </div>
      </div>
    );
  }
  