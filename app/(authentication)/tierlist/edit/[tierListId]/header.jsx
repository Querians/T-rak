import { CustomizeButton } from '@/app/components/inputComponent/button';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Inputtypefile from '@/app/components/inputTypeFile';
import axfetch from '@/utils/axfetch';
import { useQueryClient } from '@tanstack/react-query';

export default function Header(props) {
  const { tierListId, tierListData, data } = props;
  const queryClient = useQueryClient();

  const router = useRouter();

  const handleOnClickExport = (e) => {
    props.export();
    setTimeout(() => {
      Swal.fire({
        title: 'Export Complete!',
        color: '#000',
        // titleText: `Export Complete!`,
        imageUrl: '/iconCheckMark.svg',
        showCancelButton: false,
        confirmButtonColor: '#a73440',
        confirmButtonText: 'Done',
        buttonsStyling: false,
        customClass: {
          popup:
            'p-5 flex flex-col gap-[15px] bg-peach border border-cream rounded-lg',
          title: 'p-0 text-black text-[24px]',
          // titleText: 'text-red-400',
          htmlContainer: 'm-0',
          icon: 'border-0',
          actions: 'flex flex-col mt-0 gap-[15px] w-1/2',
          confirmButton:
            'bg-winered px-[20px] py-2 text-white font-bold w-full rounded-full shadow-lg border border-[#FAFEFF]',
        },
      });
    }, 2000);
  };

  const handleOnClickDelete = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      color: '#A73440',
      text: `Do you really want to delete this Tier List?`,
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axfetch
          .delete(`api/tierlist`, {
            params: { id: tierListId },
          })
          .then((res) => {
            if (res.status == 200) {
              queryClient.invalidateQueries({ queryKey: ['TierListCards'] });
              router.push(`/home`);
              Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              }).fire({
                icon: 'success',
                title: 'Delete successfully',
              });
            }
          })
          .catch((e) => {
            Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).fire({
              icon: 'error',
              title: `ERROR cannot delete this tierList\n ${e}`,
            });
          });
      }
    });
  };

  const handleOnClickSave = (e) => {
    props?.setIsEditable(false);
    props?.saveItems();
    // space for save tierList function
    // tierlistId can find from variable "tierListId"
    // data can find from variable "data"
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

  const handleOnClickRedirect = (e) => {
    router.push(`/tierlist/editDetail/${tierListId}`);
  };

  return (
    <div className='mx-5 mt-[15px] box-border flex h-[22%] shrink-0 flex-col justify-around gap-[15px] px-3 py-3.5'>
      <div className='flex items-center gap-3.5'>
        <Inputtypefile
          type='preview'
          className=' h-[70px] w-[70px] shrink-0'
          param={
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            '/storage/v1/object/public/images/' +
            tierListData?.coverPhotoUrl
          }
        />
        <div className='font-bold'>
          <p className='max-w-[200px] truncate text-lg text-white'>
            {tierListData?.name}
          </p>
          <p className='text-md max-w-[200px] truncate text-peach'>
            {tierListData?.category?.categoryName}
          </p>
          <p className='max-w-[200px] truncate text-sm text-white'>
            {tierListData?.description}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className={`w-full`}>
          <CustomizeButton
            styles={props?.isEditable ? 'btnred' : 'btnpeach'}
            text={props?.isEditable ? 'Cancel' : 'Edit'}
            onClick={() => {
              props?.setIsEditable(!props?.isEditable);
              props?.resetItems();
            }}
          />
        </div>
        <div className={`w-full`}>
          <CustomizeButton
            styles='btnpeach'
            text={props?.isEditable ? 'Edit Detail' : 'Export'}
            onClick={
              props?.isEditable ? handleOnClickRedirect : handleOnClickExport
            }
          />
        </div>
        <div className={`w-full`}>
          <CustomizeButton
            styles={props?.isEditable ? 'btnpeach' : 'deletebtn'}
            text={props?.isEditable ? 'Save' : ''}
            onClick={
              props?.isEditable ? handleOnClickSave : handleOnClickDelete
            }
          />
        </div>
      </div>
    </div>
  );
}
