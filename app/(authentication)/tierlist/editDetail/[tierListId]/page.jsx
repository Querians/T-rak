import TierListDetailEdit from '@/app/components/formInput/edittierlist';
import Profile from './profile';

export default function EditTierlistDetail({ params }) {
  console.log('params.tierListId', params.tierListId);

  return (
    <main className='flex h-screen w-full flex-col overflow-hidden'>
      <div className='justify-left flex h-[18%] w-full items-center gap-[15px] px-8 pt-10'>
        <Profile />
        <p className='text-2xl text-white '>Edit Tier-list Detail</p>
      </div>
      <div className='h-5/6 rounded-t-2xl bg-cream p-8'>
        <TierListDetailEdit tierListId={params?.tierListId} />
      </div>
    </main>
  );
}
