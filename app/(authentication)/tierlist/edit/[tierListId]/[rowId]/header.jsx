import { CustomizeButton } from '@/app/components/inputComponent/button';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Avatar } from '@nextui-org/react';
import Inputbutton from '@/app/components/inputComponent/inputbtn';

export default function Header(props) {
  const { tierListId, rowId, data } = props;

  // query from tierListId
  const tierListData = {
    name: 'this is tier list name',
    description: 'this is description',
    category: 'this is category',
    coverPhotoUrl: '/vercel.svg',
  };

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
    if (data[0].label.length == 0) {
      Swal.fire({
        title: 'The Oops...',
        text: 'The row name cannot be empty.',
        icon: 'error',
      });
      return;
    }

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
        <Avatar
          showFallback
          src={tierListData.coverPhotoUrl}
          className='h-[70px] w-[70px] shrink-0'
        />
        <div className='font-bold'>
          {props.isEditable ? (
            <div className='flex h-[36px] w-full items-center gap-5 bg-transparent'>
              <Inputbutton
                headingColor='white'
                text='Row Name'
                defaultValue={data[0].label}
                handleInputChange={(e) =>
                  props?.setTempItems((prev) => {
                    return [
                      {
                        ...prev[0],
                        ['label']: e.target.value,
                      },
                      prev[1],
                    ];
                  })
                }
              />
            </div>
          ) : (
            <>
              <p className='text-lg text-white'>{data[0].label}</p>
              <p className='text-md text-peach'>{tierListData.category}</p>
              <p className='text-sm text-white'>{tierListData.description}</p>
            </>
          )}
        </div>
      </div>
      <div
        className={`flex items-center justify-between ${
          props.isEditable ? 'gap-x-5' : 'gap-x-2'
        }`}
      >
        <button
          onClick={() => {
            router.back();
          }}
          className='h-[31px] w-[31px] rounded-lg border border-cream bg-lightpink shadow-lg'
        >
          <svg
            width='31'
            height='31'
            viewBox='0 0 31 31'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* <rect width="31" height="31" rx="8" fill="#F8EBEF"/> */}
            <rect x='5' y='6' width='20' height='20' fill='#A73440' />
            <path
              d='M21.5755 1H9.4245C4.1465 1 1 4.1465 1 9.4245V21.561C1 26.8535 4.1465 30 9.4245 30H21.561C26.839 30 29.9855 26.8535 29.9855 21.5755V9.4245C30 4.1465 26.8535 1 21.5755 1ZM18.284 21.4885H11.15C10.5555 21.4885 10.0625 20.9955 10.0625 20.401C10.0625 19.8065 10.5555 19.3135 11.15 19.3135H18.284C20.14 19.3135 21.6625 17.8055 21.6625 15.935C21.6625 14.0645 20.1545 12.5565 18.284 12.5565H10.9325L11.3095 12.9335C11.73 13.3685 11.73 14.05 11.295 14.485C11.0775 14.7025 10.802 14.804 10.5265 14.804C10.251 14.804 9.9755 14.7025 9.758 14.485L7.4815 12.194C7.061 11.7735 7.061 11.0775 7.4815 10.657L9.758 8.3805C10.1785 7.96 10.8745 7.96 11.295 8.3805C11.7155 8.801 11.7155 9.497 11.295 9.9175L10.8165 10.396H18.284C21.3435 10.396 23.8375 12.89 23.8375 15.9495C23.8375 19.009 21.3435 21.4885 18.284 21.4885Z'
              fill='#F6D8DF'
            />
          </svg>
        </button>
        <div className={`${props.isEditable ? 'w-full' : 'basis-1/3'}`}>
          <CustomizeButton
            styles={props?.isEditable ? 'btnred' : 'btnpeach'}
            text={props?.isEditable ? 'Cancel' : 'Edit'}
            onClick={() => {
              props?.setIsEditable(!props?.isEditable);
              props?.resetItems();
            }}
          />
        </div>
        <div className={`${props.isEditable ? 'w-full' : 'basis-2/3'} `}>
          <CustomizeButton
            styles={props?.isEditable ? 'btnpeach' : 'deletebtn'}
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
