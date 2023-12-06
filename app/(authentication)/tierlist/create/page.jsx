'use client'
import Image from "next/image";
import TierListForm from "@/app/components/formInput/createtierlist";
import Inputtypefile from "@/app/components/inputTypeFile";
import {useState} from 'react';

const UserData = {
  name: 'krukri',
  image: '/vercel.svg'
};

export default function CreateTierlist({profile="/profilelight.svg"}) {
  return (
    <main className='flex flex-col h-screen w-full'>
      <div className='h-[18%] w-full pt-10 px-8 flex gap-[15px] justify-left items-center'>
        <div className="w-[70px] h-[70px] rounded-full relative">
          <Inputtypefile type="preview" className=" w-[70px] h-[70px]" param ={UserData.image}/>
        </div> 
        <p className='text-2xl text-white '>Create New Tier-list</p>
      </div>
      <div className='h-5/6 p-8 bg-cream rounded-t-2xl'>
        <TierListForm />
      </div>
    </main>
  );
}