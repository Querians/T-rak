import { Button } from '@/app/components/button';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Header(props) {
  const router = useRouter();

  const handleOnClickExport = (e) => {
    props.export();
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
      title: 'Export Complete!',
    });
  };
  const handleOnClickDelete = (e) => {
    console.log('handleOnClickDelete');
    Swal.fire({
      title: 'Are you sure?',
      color: '#A73440',
      text: `Do you really want to delete this Tier List${
        props?.isEditExpand ? ' row' : ''
      }?`,
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
        // tierlistId can find from "props.tierListId"
        //
        //
        // after delete complete
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
          title: 'Delete successfully',
        });
      }
    });
  };
  const handleOnClickSave = (e) => {
    props?.setIsEditable(false);
    props?.saveItems();
    // space for save tierList function
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
    console.log('handleOnClickSave');
  };
  const handleOnClickRedirect = (e) => {
    console.log('handleOnClickRedirect');
    if (props.tierListId) {
      router.push(`/tierlist/editDetail/${props.tierListId}`);
    }
  };

  return (
    <div className='mx-5 mt-[15px] box-border flex h-[22%] shrink-0 flex-col justify-around gap-[15px] px-3 py-3.5'>
      <div className='flex items-center gap-3.5'>
        <div className='h-16 w-16 rounded-full bg-green-400 text-center'>
          some image
        </div>
        <div className='font-bold'>
          <p className='text-lg text-white'>Anime you</p>
          <p className='text-md text-peach'>Anime</p>
          <p className='text-sm text-white'>Hello How are you</p>
        </div>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className={`${props?.isEditExpand ? 'basis-1/3' : 'w-full'}`}>
          <Button
            type={props?.isEditable ? 'redbtn' : 'btnpeach'}
            text={props?.isEditable ? 'Cancel' : 'Edit'}
            onClick={() => {
              props?.setIsEditable(!props?.isEditable);
              props?.resetItems();
            }}
          />
        </div>
        <div className={`${props.isEditExpand && 'hidden'} w-full`}>
          <Button
            type='btnpeach'
            text={props?.isEditable ? 'Edit Detail' : 'Export'}
            onClick={
              props?.isEditable ? handleOnClickRedirect : handleOnClickExport
            }
          />
        </div>
        <div className={`${props?.isEditExpand ? 'basis-2/3' : 'w-full'}`}>
          <Button
            type={props?.isEditable ? 'btnpeach' : 'deletebtn'}
            text={props?.isEditable ? 'Save' : 'Delete'}
            onClick={
              props?.isEditable ? handleOnClickSave : handleOnClickDelete
            }
          />
        </div>
      </div>
    </div>
  );
}
