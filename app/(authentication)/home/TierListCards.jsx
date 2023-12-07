import { useQuery } from '@tanstack/react-query';
import axfetch from '@/utils/axfetch';
import TierlistCard from '@/app/components/tierlistCard';
import { Spinner } from '@nextui-org/react';

export default function TierListCards({ value }) {
  const fetchTierListCards = () =>
    axfetch.get('api/tierlist').then((res) => res.data);
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['fetchTierListCards'],
    queryFn: fetchTierListCards,
  });

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <Spinner className='h-full w-full' size='lg' />;
  return (
    <div className='flex flex-col gap-2.5 '>
      {data &&
        data
          ?.filter(
            (tierList) =>
              tierList?.category?.categoryName
                .toLowerCase()
                .includes(value.toLowerCase()) ||
              tierList?.name?.toLowerCase().includes(value.toLowerCase())
          )
          .map((tierList, index) => {
            console.log('tierList', tierList);
            // console.log('tierlistId', tierList.tierlistId);
            return (
              <TierlistCard
                key={index}
                pic={`${
                  isSuccess &&
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                    '/storage/v1/object/public/images/' +
                    tierList.coverPhotoUrl
                }`}
                tierlistName={tierList.name}
                category={tierList.category.categoryName}
                link={`/tierlist/edit/${tierList.tierlistId}`}
              />
            );
          })}
    </div>
  );
}
