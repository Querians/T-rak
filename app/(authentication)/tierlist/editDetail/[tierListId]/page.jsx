import TierListDetailEdit from '@/app/components/formInput/edittierlist';
import Inputtypefile from '@/app/components/inputTypeFile';

const tierListData = {
  tierlistId: '1234',
  name: 'Animeeeeee',
  category: 'Abanda',
  description: 'kdhivgibvbvjhvodpuh',
  coverPhotoUrl: '/vercel.svg',
};

export default function EditTierlistDetail({ params }) {
  console.log('params.tierListId', params.tierListId);

  return (
    <main className='flex h-screen w-full flex-col'>
      <div className='justify-left flex h-[18%] w-full items-center gap-[15px] px-8 pt-10'>
        <div className='relative h-[70px] w-[70px] rounded-full'>
          <Inputtypefile
            type='preview'
            className=' h-[70px] w-[70px]'
            param={tierListData.coverPhotoUrl}
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
