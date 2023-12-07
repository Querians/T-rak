import { useQuery } from '@tanstack/react-query';
import axfetch from '@/utils/axfetch';
import Combobox from '@/app/components/inputComponent/combobox';
import { Spinner } from '@nextui-org/react';

export default function Category() {
  const fetchCategory = async () =>
    await axfetch.get('api/category').then((res) => res.data);
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['category'],
    queryFn: fetchCategory,
  });

  if (error) return <p>{error.message}</p>;
  // if (isLoading) return <Spinner className='h-full w-full' size='lg' />;
  console.log(data);
  return (
    <Combobox
      text='Category'
      name='categoryName'
      data={data}
      defaultValue={''}
    />
  );
}
