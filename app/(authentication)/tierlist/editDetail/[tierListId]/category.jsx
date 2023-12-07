import { useQuery } from '@tanstack/react-query';
import axfetch from '@/utils/axfetch';
import Combobox from '@/app/components/inputComponent/combobox';

export default function Category({ handleCombobox, defaultValue }) {
  const fetchCategory = async () =>
    await axfetch.get('api/category').then((res) => res.data);
  const { data, error } = useQuery({
    queryKey: ['category'],
    queryFn: fetchCategory,
  });

  if (error) return <p>{error.message}</p>;
  return (
    <Combobox
      text='Category'
      name='categoryName'
      data={data}
      defaultValue={defaultValue}
      handleCombobox={handleCombobox}
    />
  );
}
