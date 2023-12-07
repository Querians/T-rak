import Inputtypefile from '@/app/components/inputTypeFile';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import axfetch from '@/utils/axfetch';

export default function Profile() {
  const fetchUserData = () => axfetch.get('api/user').then((res) => res.data);
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  if (error) return <p>{error.message}</p>;
  // if (isLoading) return <Spinner className='h-full w-full' size='lg' />;
  return (
    <>
      <div className='flex justify-between'>
        <div className='h-[70px] w-[70px] rounded-full bg-cream shadow-lg'>
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
        <Image
          src='/logoTRak.svg'
          alt='T-Rak Logo'
          width={65}
          height={65}
          priority
        />
      </div>
      <p className='text-lg text-white'>
        Nice to see you,{' '}
        <span className='font-bold'>{data?.name ? data.name : '...'} </span>!
      </p>
    </>
  );
}
