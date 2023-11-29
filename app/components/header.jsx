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
  };
  const handleOnClickSave = (e) => {
    props?.setIsEditable(false);
    props?.saveItems();
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
        <div className='w-full'>
          <Button
            type={props?.isEditable ? 'redbtn' : 'btnpeach'}
            text={props?.isEditable ? 'Cancel' : 'Edit'}
            onClick={() => {
              props?.setIsEditable(!props?.isEditable);
              props?.resetItems();
            }}
          />
        </div>
        <div className='w-full'>
          <Button
            type='btnpeach'
            text={props?.isEditable ? 'Edit Detail' : 'Export'}
            onClick={
              props?.isEditable ? handleOnClickRedirect : handleOnClickExport
            }
          />
        </div>
        <div className='w-full'>
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
