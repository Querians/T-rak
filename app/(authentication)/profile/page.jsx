'use client'
import ProfileSetting from '@/app/components/formInput/profileSetting';
import { CustomizeButton } from '@/app/components/inputComponent/button';
import MenuBar from '@/app/components/menuComponent/menuBar';
import Image from 'next/image';
import {useState} from 'react'
import { motion } from 'framer-motion';

const profileData ={ 
  email:"abd@gmail.com",    
  name:"Abanda", 
  image:"/vercel.svg",
  aboutMe:"Hello how are you",
}

export default function ProfileDetail() {
  const [isEdit, setIsEdit] = useState(false)
  const [profile, setProfile] = useState(profileData)
  const handleOnClick = () => {
    setIsEdit(!isEdit)
  }

  const handleCancel = () => {
    setProfile(profileData)
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
          {!isEdit && (
            <motion.div 
              className='w-[50%]' 
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.1 }}
              >
              <CustomizeButton text='Sign Out' styles='logoutbtn' btType="submit"/>
            </motion.div>
          )}
        </motion.div>
        <div className='h-[85%] p-8 bg-cream rounded-t-2xl static'>
          <ProfileSetting editState={isEdit} handleOnClick={handleOnClick} handleCancel={handleCancel} profileData={profile} setProfile={setProfile}/>
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
