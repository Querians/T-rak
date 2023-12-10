'use client';
import ProfileSetting from '@/app/components/formInput/profileSetting';
import { CustomizeButton } from '@/app/components/inputComponent/button';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfileDetail() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='flex'>
      <main className='flex h-screen w-full flex-col'>
        <motion.div
          className={`flex h-[15%] w-full items-center gap-[45px] px-8 pt-6 ${
            isEdit ? 'justify-center' : 'justify-between'
          }`}
        >
          <Image
            src='/logoTRak.svg'
            alt='logo'
            width={60}
            height={60}
            quality={100}
            priority={true}
            className={`transition-transform ${
              isEdit ? 'mr-6 translate-x-3 duration-[3000ms]' : ''
            }`}
          />
          {!isEdit && (
            <motion.div
              className='w-[50%]'
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.1 }}
            >
              <CustomizeButton
                text='Sign Out'
                styles='logoutbtn'
                btType='submit'
              />
            </motion.div>
          )}
        </motion.div>
        <div className='static h-[85%] rounded-t-2xl bg-cream p-8'>
          <ProfileSetting editState={isEdit} setIsEdit={setIsEdit} />
        </div>
      </main>
    </div>
  );
}
