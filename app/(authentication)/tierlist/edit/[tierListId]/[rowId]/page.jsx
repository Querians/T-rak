'use client';
import Header from './header';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MenuBar from '@/app/components/menuComponent/menuBar';
import { useQuery } from '@tanstack/react-query';
import axfetch from '@/utils/axfetch';
import { Spinner } from '@nextui-org/react';

const RowDragable = dynamic(
  () => import('@/app/components/dragComponent/rowDragable'),
  {
    ssr: false,
  }
);

export default function EditExpand({ params }) {
  const fetchRowData = async () =>
    await axfetch
      .get(`api/tierlist/row/?id=${params.rowId}`)
      .then((res) => res.data);
  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ['tierListData', params.rowId],
    queryFn: fetchRowData,
  });
  // items = [chosenRow, spawnerRow(a row that has Id = -1)]
  const [items, setItems] = useState([]);
  const [tempItems, setTempItems] = useState(items);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items]);
  useEffect(() => {
    if (!data) return;
    const formatData = data.map((row, index) => {
      return {
        ...row,
        id: index == 1 ? -1 : row.rowId,
        deletedElements: [],
        elements: row.elements.map((element) => {
          return {
            ...element,
            toShowSrc:
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              '/storage/v1/object/public/images/' +
              element?.pictureUrl,
            id: element.elementId,
          };
        }),
      };
    });
    setItems(formatData);
    setTempItems(formatData);
  }, [data]);

  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoading) return <Spinner className='h-screen w-screen' size='lg' />;

  return (
    <div className='relative flex h-screen w-full flex-col overflow-hidden'>
      <Header
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        setTempItems={setTempItems}
        resetItems={() => {
          setTempItems(items);
        }}
        saveItems={() => {
          setItems(tempItems);
        }}
        tierListId={params.tierListId}
        rowId={params.rowId}
        data={tempItems}
      />
      <div className='relative h-[78%] shrink-0 grow-0  rounded-t-[20px] bg-cream'>
        <div
          className={` transition-[height] ${
            isEditable ? 'h-[100%]' : 'h-[85%]'
          } w-full touch-auto snap-y overflow-y-auto scroll-auto`}
        >
          {isSuccess && tempItems[0]?.id && (
            <RowDragable
              items={tempItems}
              setItems={setTempItems}
              isEditable={isEditable}
            />
          )}
        </div>
        <div
          className={`absolute inset-x-0 bottom-5 flex h-1/6 shrink-0 justify-center ${
            isEditable && 'hidden'
          }`}
        >
          <MenuBar type={'home'} />
        </div>
      </div>
    </div>
  );
}
