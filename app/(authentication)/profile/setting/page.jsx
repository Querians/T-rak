'use client'
import ProfileSetting from '@/app/components/profileSetting';
import { CustomizeButton } from '@/app/components/button';
import MenuBar from '@/app/components/menuBar';
import Image from 'next/image';
import {useState} from 'react'
import { motion } from 'framer-motion';

export default function ProfileDetail() {
  const [isEdit, setIsEdit] = useState(false)

  const handleOnClick = () => {
      setIsEdit(!isEdit)
  }

  return (
    <div className='flex'>
      <main className='flex flex-col h-screen w-full'>
        <motion.div className={`h-[15%] w-full pt-6 px-8 gap-[45px] flex items-center ${(isEdit) ? 'justify-center':'justify-between'}`}>
          <Image
            src= "/logoTRak.svg"
            alt="logo"
            width={60}
            height={60}
            quality={100}
            className={`transition-transform ${(isEdit) ? 'translate-x-3 mr-6 duration-[3000ms]':''}`}
          />
          {/* {!isEdit && ()} */}
          {!isEdit && (
            <motion.div 
              className='w-[50%]' 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              >
              <CustomizeButton text='Sign Out' styles='logoutbtn' btType="submit"/>
            </motion.div>
          )}
        </motion.div>
        <div className='h-[85%] p-8 bg-cream rounded-t-2xl static'>
          <ProfileSetting editState={isEdit} handleOnClick={handleOnClick}/>
          {!isEdit && (
            <div className={`transition-transform absolute bottom-14 left-1/2 -translate-x-1/2 ${(isEdit) ? '-translate-y-6 mt-6 duration-[3000ms]':''}`}>
              <MenuBar type='profile'/>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
