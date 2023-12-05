import Image from 'next/image';
import TierListDetailEdit from '@/app/components/formInput/edittierlist';

const tierListData ={ 
  tierlistId:"1234",
  name:"Animeeeeee",    
  category:"Abanda", 
  description:"kdhivgibvbvjhvodpuh",
}

export default function EditTierlistDetail({ params }) {
  const profile = {
    image: '/profilelight.svg',
  };
  console.log('params.tierListId', params.tierListId);

  return (
    <main className='flex h-screen w-full flex-col'>
      <div className='justify-left flex h-[18%] w-full items-center gap-[15px] px-8 pt-10'>
        <div className='relative h-[70px] w-[70px] rounded-full'>
          <Image
            src={profile.image}
            alt='Profile Picture'
            className='cursor-pointer rounded-full object-cover shadow-lg'
            fill={true}
            quality={100}
            sizes='(max-width: 70px) 100vw, 33vw'
            priority
          />
        </div>
        <p className='text-2xl text-white '>Edit Tier-list Detail</p>
      </div>
      <div className='h-5/6 rounded-t-2xl bg-cream p-8'>
        <TierListDetailEdit tierListData={tierListData} />
      </div>
    </main>
  );
}
