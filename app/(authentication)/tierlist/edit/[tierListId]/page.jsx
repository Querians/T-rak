'use client';
import { useState, useEffect, useRef } from 'react';
// import { data } from './data';
import MenuBar from '@/app/components/menuComponent/menuBar';
import Header from './header';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import axfetch from '@/utils/axfetch';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const TierList = dynamic(
  () => import('@/app/components/dragComponent/tierList'),
  {
    ssr: false,
  }
);

export default function CurrentTierList({ params }) {
  const fetchTierListData = async () =>
    await axfetch
      .get(`api/tierlist/show/?id=${params.tierListId}`)
      .then((res) => res.data);
  const { data, error, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['tierListData', params.tierListId],
    queryFn: fetchTierListData,
  });
  const router = useRouter();

  const [items, setItems] = useState([]);
  // for editing
  const [tempItems, setTempItems] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  // for exporting
  const [isExporting, setIsExporting] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    console.log('items:', items);
  }, [items]);
  useEffect(() => {
    if (!data) return;
    const formatData = data.rows.map((row, index) => {
      return {
        ...row,
        id: index == data.rows.length - 1 ? -1 : row.rowId,
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
  useEffect(() => {
    if (isExporting) {
      setTimeout(() => {
        setIsExporting(false);
      }, 1);
    }
  }, [isExporting]);

  useEffect(() => {
    if (error) {
      router.push(`/home`);
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).fire({
        icon: 'error',
        title: 'TierList NOT Found',
      });
    }
  }, [error, router]);

  if (error) {
    return <></>;
  }

  if (isLoading) return <Spinner className='h-screen w-screen' size='lg' />;

  return (
    <div className='relative flex h-screen w-full flex-col overflow-hidden'>
      <Header
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        export={async () => {
          const { exportComponentAsJPEG } = await import(
            'react-component-export-image'
          );
          setIsExporting(true);
          setTimeout(() => {
            exportComponentAsJPEG(componentRef);
          }, 1);
        }}
        resetItems={() => {
          setTempItems(items);
        }}
        saveItems={() => {
          setItems(tempItems);
        }}
        tierListId={params.tierListId}
        tierListData={data}
        data={tempItems}
      />
      <div className='flex h-[78%] shrink-0 grow-0 flex-col items-center gap-y-[22px] rounded-t-[20px] bg-cream px-4 py-[27px]'>
        <div
          ref={componentRef}
          className={`${
            isExporting
              ? 'w-fit'
              : 'h-[95%] w-full touch-auto snap-y overflow-y-auto scroll-auto'
          }`}
        >
          {isSuccess && !isFetching && (
            <TierList
              originalLength={items?.length || 0}
              isExporting={isExporting}
              tierListId={params.tierListId}
              items={isEditable ? tempItems : items}
              setItems={isEditable ? setTempItems : setItems}
              isEditable={isEditable}
              className={`flex flex-col gap-y-2.5 px-1 transition-[height] ${
                !isEditable ? 'h-5/6 ' : 'h-3/4 overflow-y-auto'
              }  w-full shrink-0 py-2.5`}
            />
          )}
        </div>
        <div className={`h-1/6 shrink-0 ${isEditable && 'hidden'}`}>
          <MenuBar type={'home'} />
        </div>
      </div>
    </div>
  );
}
