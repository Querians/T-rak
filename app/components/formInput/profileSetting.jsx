'use client';
import Inputbutton from '../inputComponent/inputbtn';
import { CustomizeButton } from '../inputComponent/button';
import Inputtypefile from '../inputTypeFile';
import MenuBar from '@/app/components/menuComponent/menuBar';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner } from '@nextui-org/react';

export default function ProfileSetting({ editState, setIsEdit }) {
  const fetchUserData = () => axios.get('api/user').then((res) => res.data);

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  const profileData = {
    email: data?.email || '',
    name: data?.name || '',
    imageUrl:
      isSuccess &&
      process.env.NEXT_PUBLIC_SUPABASE_URL +
        '/storage/v1/object/public/images/' +
        data?.image,
    aboutMe: data?.aboutMe || '',
  };

  const [profile, setProfile] = useState(profileData);
  useEffect(() => {
    setProfile(profileData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  const handleOnClick = () => {
    setIsEdit(!editState);
  };

  const handleCancel = () => {
    setProfile(profileData);
    setIsEdit(!editState);
  };

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <Spinner className='h-full w-full' size='lg' />;
  return (
    <>
      <div className='flex gap-7 px-2'>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData();
            Object.entries(profile).forEach(([key, value]) => {
              formData.append(key, value);
            });
            formData.delete('imageUrl');
            const res = await fetch('api/user', {
              method: 'POST',
              body: formData,
            });
            handleOnClick();
          }}
          className='flex w-full flex-col gap-5'
        >
          <div className='h-[90px] w-[90px] self-center rounded-full bg-red-400'>
            <Inputtypefile
              className='h-[90px] w-[90px] shrink-0 rounded-full'
              name='picture'
              read={editState}
              param={profile.imageUrl}
              handleChange={(e) => {
                if (!e.target.files[0]) {
                  return;
                }
                setProfile({
                  ...profile,
                  ['picture']: e.target.files[0],
                  ['imageUrl']: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
          </div>
          <Inputbutton
            text='Email'
            type='email'
            name='email'
            read={0}
            value={profile.email}
            handleInputChange={(e) => {
              setProfile({
                ...profile,
                ['email']: e.target.value,
              });
            }}
          />
          <Inputbutton
            text='Username'
            type='text'
            name='name'
            read={editState}
            value={profile.name}
            handleInputChange={(e) => {
              setProfile({
                ...profile,
                ['name']: e.target.value,
              });
            }}
          />
          <Inputbutton
            text='About Me'
            name='aboutMe'
            isArea={1}
            read={editState}
            value={profile.aboutMe}
            handleInputChange={(e) => {
              setProfile({
                ...profile,
                ['aboutMe']: e.target.value,
              });
            }}
          />
          {editState ? (
            <div className='flex justify-between gap-[18px] pt-4 '>
              <div className='basis-1/3'>
                <CustomizeButton
                  text='Cancel'
                  styles='btncherry'
                  onClick={handleCancel}
                />
              </div>
              <div className='basis-2/3'>
                <CustomizeButton
                  text='Save'
                  styles='btnpeach'
                  btType='submit'
                />
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center pt-4'>
              <div className='w-[40%]'>
                <CustomizeButton
                  text='Edit'
                  styles='btnpeach'
                  btType='submit'
                  onClick={handleOnClick}
                />
              </div>
            </div>
          )}
        </form>
      </div>
      {!editState && (
        <div
          className={`absolute bottom-14 left-1/2 -translate-x-1/2 transition-transform ${
            editState ? 'mt-6 -translate-y-6 duration-[3000ms]' : ''
          }`}
        >
          <MenuBar type='profile' />
        </div>
      )}
    </>
  );
}
