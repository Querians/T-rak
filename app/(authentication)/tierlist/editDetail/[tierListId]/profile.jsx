'use client';
import Inputtypefile from '@/app/components/inputTypeFile';
import { useQuery } from '@tanstack/react-query';
import axfetch from '@/utils/axfetch';

export default function Profile() {
  const fetchUserData = async () =>
    await axfetch.get('api/user').then((res) => res.data);
  const { data, error, isSuccess } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  if (error) return <p>{error.message}</p>;
  return (
    <div className='relative h-[70px] w-[70px] rounded-full'>
      <Inputtypefile
        type='preview'
        className=' h-[70px] w-[70px]'
        param={
          isSuccess &&
          process.env.NEXT_PUBLIC_SUPABASE_URL +
            '/storage/v1/object/public/images/' +
            data?.image
        }
      />
    </div>
  );
}
