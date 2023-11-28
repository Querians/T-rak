'use client'
import ProfileSetting from '@/app/components/profileSetting';
import { CustomizeButton } from '@/app/components/button';
import MenuBar from '@/app/components/menuBar';
import Image from 'next/image';
import {useState} from 'react'

export default function ProfileDetail() {
  const [isEdit, setIsEdit] = useState(false)

  const handleOnClick = () => {
      setIsEdit(!isEdit)
  }

  return (
    <div className='flex'>
      <main className='flex flex-col h-screen w-full'>
        <div className={`h-[15%] w-full pt-6 px-8 gap-[45px] flex items-center ${(isEdit) ? 'justify-center':'justify-between'}`}>
          <Image
            src= "/logoTRak.svg"
            alt="logo"
            width={60}
            height={60}
            quality={100}
          />
          {/* {!isEdit && ()} */}
          {!isEdit && (
            <div className='w-[50%]'>
              <CustomizeButton text='Sign Out' styles='logoutbtn' btType="submit"/>
            </div>
          )}
        </div>
        <div className='h-[85%] p-8 bg-cream rounded-t-2xl static'>
          <ProfileSetting editState={isEdit} handleOnClick={handleOnClick}/>
          {!isEdit && (
            <div className='absolute bottom-14 left-1/2 transform -translate-x-1/2 "'>
              <MenuBar type='profile'/>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
