'use client';
import Inputbutton from '../inputComponent/inputbtn';
import { CustomizeButton } from '../inputComponent/button';
import Link from 'next/link';
import Combobox from '../inputComponent/combobox';
import NumberInput from '../inputComponent/numberInput';
import Inputtypefile from '../inputTypeFile';

export default function TierListDetailEdit({
  tierListData,
  A = 'hello',
  setTierListDetails,
  tierlistDetails,
}) {
  const categoryData = [
    {
      id: '1',
      name: 'Anime',
    },
    {
      id: '2',
      name: 'Animehell',
    },
  ];
  return (
    <div className='flex gap-7 px-2'>
      <form
        action='/api/auth/editTierlist'
        method='post'
        className='flex w-full flex-col gap-5'
      >
        <Inputbutton
          text='Tierlist Name'
          type='text'
          name='name'
          defaultValue={tierListData.name}
        />
        <Inputtypefile
          read={1}
          className=' h-[90px] w-[90px]'
          text='Edit Cover Photo'
          name='CoverPhoto'
          param={tierlistDetails.coverPhotoUrl}
          handleChange={(e) => {
            if (!e.target.files[0]) {
              return;
            }
            setTierListDetails({
              ...tierlistDetails,
              ['coverPhotoFile']: e.target.files[0],
              ['coverPhotoUrl']: URL.createObjectURL(e.target.files[0]),
            });
          }}
        />
        <Combobox
          text='Category'
          data={categoryData}
          defaultValue={tierListData.category}
        />
        <Inputbutton
          text='Description'
          name='description'
          isArea={1}
          defaultValue={tierListData.description}
        />
        <div className='flex justify-between gap-[18px] pt-4 '>
          <div className='basis-1/3'>
            <Link href={'/home'} className='w-full'>
              <CustomizeButton text='Cancel' styles='btncherry' />
            </Link>
          </div>
          <div className='basis-2/3'>
            <CustomizeButton text='Save' styles='btnpeach' btType='submit' />
          </div>
        </div>
      </form>
    </div>
  );
}
