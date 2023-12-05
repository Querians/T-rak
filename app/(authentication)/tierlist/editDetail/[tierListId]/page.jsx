import Image from 'next/image';
import TierListDetailEdit from '@/app/components/formInput/edittierlist';
import Inputtypefile from '@/app/components/inputTypeFile';

export default function EditTierlistDetail({ params }) {
  const profile = {
    image: '/profilelight.svg',
  };
  console.log('params.tierListId', params.tierListId);

  const UserData = {
    image: '/vercel.svg'
  };

  return (
    <main className='flex h-screen w-full flex-col'>
      <div className='justify-left flex h-[18%] w-full items-center gap-[15px] px-8 pt-10'>
        <div className='relative h-[70px] w-[70px] rounded-full'>
          <Inputtypefile type="preview" className=" w-[70px] h-[70px]" param = {UserData.image} />
        </div>
        <p className='text-2xl text-white '>Edit Tier-list Detail</p>
      </div>
      <div className='h-5/6 rounded-t-2xl bg-cream p-8'>
        <TierListDetailEdit />
      </div>
    </main>
  );
}
