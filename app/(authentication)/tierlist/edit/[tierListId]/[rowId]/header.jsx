import { Button } from '@/app/components/button';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header(props) {
  const { tierListId, rowId, data } = props;
  const [rowLabel, setRowLabel] = useState('');

  // query from tierListId
  const tierListData = {
    name: 'this is tier list name',
    description: 'this is description',
    category: 'this is category',
    coverPhotoUrl: '/vercel.svg',
  };
  // query from rowId
  const rowData = {
    label: 'this is row label',
  };

  useEffect(() => {
    setRowLabel(rowData.label);
  }, [rowData.label]);

  const router = useRouter();

  const handleOnClickDelete = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      color: '#A73440',
      text: `Do you really want to delete this Tier List row?`,
      iconHtml:
        '<Image src="/iconTrash.svg" width=65px height=65px alt="delete icon" />',
      showCancelButton: true,
      confirmButtonColor: '#a73440',
      cancelButtonColor: '#DE717C',
      confirmButtonText: 'Delete',
      buttonsStyling: false,
      customClass: {
        popup:
          'flex flex-col gap-[15px] bg-peach border border-cream rounded-lg',
        title: 'p-0',
        htmlContainer: 'm-0',
        icon: 'border-0',
        actions: 'flex flex-col gap-[15px] w-1/2',
        confirmButton:
          'bg-winered py-2 text-white font-bold w-full rounded-lg shadow-lg border border-[#FAFEFF]',
        cancelButton:
          'bg-cherry py-2 text-white font-bold w-full rounded-lg shadow-lg border border-[#FAFEFF]',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // space for remove tierList function
        // tierlistId, rowId can find from "tierListId", "rowId"
        //
        //
        // after delete complete
        // idk it need a popup or not
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        })
          .fire({
            icon: 'success',
            title: `Delete ${data[0].label} row successfully`,
          })
          .then(() => {});
        // if success (just didn't want to wait until popup is end then redirect page)
        router.push(`/tierlist/edit/${tierListId}`);
      }
    });
  };

  const handleOnClickSave = (e) => {
    props?.setIsEditable(false);
    props?.saveItems();
    // space for save tierList function
    // tierlistId, rowId, data can find from "tierListId", "rowId", "data"
    //
    //
    // after saving complete
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    }).fire({
      icon: 'success',
      title: 'Save successfully',
    });
  };

  return (
    <div className='mx-5 mt-[15px] box-border flex h-[22%] shrink-0 flex-col justify-around gap-[15px] px-3 py-3.5'>
      <div className='flex items-center gap-3.5'>
        <div className='relative flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-green-400 text-center'>
          <Image
            src={tierListData.coverPhotoUrl}
            fill={true}
            alt='my tier list photo'
          />
        </div>
        <div className='font-bold'>
          {props.isEditable ? (
            <div className='flex h-[36px] w-full items-center gap-5 rounded-[15px] border-1 border-white bg-lightpink shadow-lg'>
              <input
                className='w-full rounded-xl bg-transparent px-5 text-darkgrey placeholder-peach placeholder:text-left focus:ring-0 focus:ring-offset-0 '
                type='text'
                value={rowLabel}
                onChange={(e) => setRowLabel(e.target.value)}
              />
            </div>
          ) : (
            <p className='text-lg text-white'>{rowLabel}</p>
          )}
          <p className='text-md text-peach'>{tierListData.category}</p>
          <p className='text-sm text-white'>{tierListData.description}</p>
        </div>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className={`basis-1/3`}>
          <Button
            type={props?.isEditable ? 'redbtn' : 'btnpeach'}
            text={props?.isEditable ? 'Cancel' : 'Edit'}
            onClick={() => {
              props?.setIsEditable(!props?.isEditable);
              props?.resetItems();
            }}
          />
        </div>
        <div className={`basis-2/3`}>
          <Button
            type={props?.isEditable ? 'btnpeach' : 'deletebtn'}
            text={props?.isEditable ? 'Save' : 'This Row'}
            onClick={
              props?.isEditable ? handleOnClickSave : handleOnClickDelete
            }
          />
        </div>
      </div>
    </div>
  );
}
