import Container from '@/app/components/container';
import Swal from 'sweetalert2';

export default function Spawner(props) {
  const { items, handleRemoveElement } = props;
  const temp = items.map((row) => {
    if (row.id == -1) return;
    return {
      [`${row.id}`]: row.label,
    };
  });
  const menu = Object.assign({}, ...temp);

  const handleSelectRowTop = (selectRowId, selectElementId) => {
    props?.setItems((prev) => {
      const rowIndex = props?.items?.findIndex((row) => row.id === selectRowId);
      const elementIndex = props?.items[prev.length - 1]?.elements?.findIndex(
        (element) => element.id === selectElementId
      );

      return [
        ...prev.slice(0, rowIndex),
        {
          ...prev[rowIndex],
          ['elements']: [
            prev[prev.length - 1].elements[elementIndex],
            ...prev[rowIndex].elements,
          ],
        },
        ...prev.slice(rowIndex + 1, -1),
        {
          ...prev[prev.length - 1],
          ['elements']: prev[prev.length - 1].elements.filter(
            (element) => element.id !== selectElementId
          ),
        },
      ];
    });
  };

  const handleSelectRowBot = (selectRowId, selectElementId) => {
    props?.setItems((prev) => {
      const rowIndex = props?.items?.findIndex((row) => row.id === selectRowId);
      const elementIndex = props?.items[prev.length - 1]?.elements?.findIndex(
        (element) => element.id === selectElementId
      );

      return [
        ...prev.slice(0, rowIndex),
        {
          ...prev[rowIndex],
          ['elements']: [
            ...prev[rowIndex].elements,
            prev[prev.length - 1].elements[elementIndex],
          ],
        },
        ...prev.slice(rowIndex + 1, -1),
        {
          ...prev[prev.length - 1],
          ['elements']: prev[prev.length - 1].elements.filter(
            (element) => element.id !== selectElementId
          ),
        },
      ];
    });
  };

  const handleMenu = async (elementId) => {
    await Swal.fire({
      title: 'Select a menu',
      input: 'select',
      inputOptions: {
        Row: props?.isEditExpand ? { add: 'Add' } : menu,
        Delete: {
          Delete: 'Delete This Image',
        },
      },
      buttonsStyling: false,
      customClass: {
        popup:
          'px-5 py-[15px] flex gap-[15px] bg-mint border border-cream rounded-lg',
        title: 'text-cherry',
        input:
          'bg-lightpink border-2 rounded-lg shadow-lg border border-[#FAFEFF]',
        actions: 'flex flex-row-reverse gap-x-[12px] w-full',
        confirmButton:
          'bg-peach py-2 text-white min-w-[150px] font-bold rounded-lg shadow-lg border border-[#FAFEFF]',
        cancelButton:
          'bg-cherry py-2 text-white min-w-[100px] font-bold rounded-lg shadow-lg border border-[#FAFEFF]',
      },
      inputPlaceholder: 'Select a menu',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'Delete') {
            handleRemoveElement(elementId, items.length - 1);
            // resolve();
          } else {
            if (value.length == 0) return resolve();
            if (props?.isEditExpand) {
              handleSelectRowBot(items[0].id, elementId);
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
                title: 'Add successfully',
              });
            } else {
              handleSelectRowTop(value, elementId);
              resolve();
            }
          }
        });
      },
    });
  };

  const handleAddElement = async () => {
    await Swal.fire({
      inputLabel: 'Title Name',
      html: `
      <div class='flex flex-col gap-y-[15px]'>
        <div class='text-left'>
          <p class='text-xl text-cherry font-bold'>Title Name</p>
          <div class='w-full h-[36px] rounded-[15px] border-1 border-white bg-lightpink flex gap-5 items-center shadow-lg'>
              <input
                id="swal-input1"  
                class="w-full bg-transparent text-darkgrey placeholder-peach placeholder:text-left pl-5 pr-5 rounded-xl focus:ring-0 focus:ring-offset-0 " 
                type="text" 
                placeholder='Title Name'
              />
          </div>
        </div>
        <div class='text-left'>
          <p class='text-xl text-cherry font-bold'>Add Photo</p>
          <div class="flex justify-center items-center">
            <label>
                <input
                    id="swal-input2"
                    type='file'
                    class='hidden'
                />
                <img
                    src= "/iconInputFilebtn.svg"
                    alt="add text icon"
                    class= "inline w-[114px] h-[114px]"
                />
            </label>
          </div>
        </div>
      </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      buttonsStyling: false,
      customClass: {
        popup:
          'px-5 pt-[46px] pb-[50px] flex flex-col bg-mint border border-cream rounded-lg',
        actions: 'flex flex-row-reverse gap-x-[12px] w-full',
        confirmButton:
          'bg-peach py-2 text-white min-w-[150px] font-bold rounded-lg shadow-lg border border-[#FAFEFF]',
        cancelButton:
          'bg-cherry py-2 text-white min-w-[100px] font-bold rounded-lg shadow-lg border border-[#FAFEFF]',
      },
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').files[0],
        ];
      },
    }).then((data) => {
      // user click confirm button
      if (data.isConfirmed) {
        //
        if (data.value[0].length == 0 || !data.value[1]) {
          return;
        }
        // console.log(data.value[1]);
        props.setItems((prev) => {
          return [
            ...prev.slice(0, -1),
            {
              ...prev[prev.length - 1],
              elements: [
                {
                  elementId: -2,
                  id: window.crypto.randomUUID({ disableEntropyCache: true }),
                  title: data.value[0],
                  picture: data.value[1],
                  toShowSrc: URL.createObjectURL(data.value[1]),
                },
                ...prev[prev.length - 1].elements,
              ],
            },
          ];
        });
      }
    });
  };

  return (
    // if we use overflow-x-auto the menu will disappear dueto overflow. Even we do only overflow-"x-auto
    <div
      className={`transition ${
        !props.isEditable && 'translate-y-[250%] opacity-0'
      }  absolute inset-x-0 bottom-0 z-10 h-[152px] rounded-t-[10px] bg-cherry`}
    >
      {/* <div className='absolute z-10 bottom-[40px] left-1/2 transform -translate-x-1/2 flex items-end w-[325px] mt-96 overflow-y-visible overflow-x-scroll'> */}
      <Container
        rows={props?.items}
        isSpawner={true}
        isEditable={true}
        rowIndex={items.length - 1}
        handleAddElement={handleAddElement}
        handleMenu={handleMenu}
        onRemove={handleRemoveElement}
        id={items[items.length - 1].id}
        items={items[items.length - 1].elements}
        className={`flex w-full shrink-0 grow-0 gap-x-[15px] overflow-x-auto overflow-y-visible p-4`}
        itemClassName={`relative w-[70px] h-[70px] shrink-0 rounded-xl shadow-lg`}
      />
      {/* </div> */}
    </div>
  );
}
