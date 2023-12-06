'use client';
import Inputbutton from '../inputComponent/inputbtn';
import { CustomizeButton } from '../inputComponent/button';
import Inputtypefile from '../inputTypeFile';

export default function ProfileSetting({
  editState,
  handleOnClick,
  profileData,
  handleCancel,
  setProfile,
}) {
  return (
    <div className='flex gap-7 px-2'>
      <form
        // action='/api/auth/profile' //editlinkhere
        // method='post'
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          Object.entries(profileData).forEach(([key, value]) => {
            formData.append(key, value);
          });
          const res = await fetch('api/auth/profile', {
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
            param={profileData.imageUrl}
            handleChange={(e) => {
              if (!e.target.files[0]) {
                return;
              }
              setProfile({
                ...profileData,
                ['image']: e.target.files[0],
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
          value={profileData.email}
          handleInputChange={(e) => {
            setProfile({
              ...profileData,
              ['email']: e.target.value,
            });
          }}
        />
        <Inputbutton
          text='Username'
          type='text'
          name='name'
          read={editState}
          value={profileData.name}
          handleInputChange={(e) => {
            setProfile({
              ...profileData,
              ['name']: e.target.value,
            });
          }}
        />
        <Inputbutton
          text='About Me'
          name='aboutMe'
          isArea={1}
          read={editState}
          value={profileData.aboutMe}
          handleInputChange={(e) => {
            setProfile({
              ...profileData,
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
              <CustomizeButton text='Save' styles='btnpeach' btType='submit' />
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
  );
}
