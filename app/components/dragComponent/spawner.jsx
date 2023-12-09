import Container from '@/app/components/dragComponent/container';
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
    if (props?.isEditExpand) {
      await Swal.fire({
        title: 'Add element to row',
        buttonsStyling: false,
        showDenyButton: true,
        denyButtonText: `Delete This Element`,
        confirmButtonText: `Add`,
        customClass: {
          popup:
            'px-6 py-[15px] pb-16 flex bg-mint border border-cream rounded-2xl',
          title: 'text-darkgrey mb-[15px]',
          inputLabel: 'mt-0 w-full inline text-cherry text-2xl',
          input:
            'm-0 mb-[15px] bg-lightpink border-2 rounded-2xl shadow-lg border border-[#FAFEFF]',
          actions: 'flex flex-row gap-x-[12px] gap-y-[15px] w-full',
          confirmButton:
            'h-[33px] order-3 bg-peach text-white min-w-[168px] rounded-2xl shadow-lg border border-[#FAFEFF]',
          cancelButton:
            'h-[33px] order-2 bg-cherry text-white min-w-[112px] rounded-2xl shadow-lg border border-[#FAFEFF]',
          denyButton:
            'h-[33px] order-1 bg-winered text-white w-full min-w-[70px] rounded-2xl shadow-lg border border-[#FAFEFF]',
        },
        inputPlaceholder: 'Select a row',
        showCancelButton: true,
      }).then((result) => {
        if (result.isDenied) {
          handleRemoveElement(elementId, items.length - 1);
        } else if (result.isConfirmed) {
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
        }
      });
    } else {
      await Swal.fire({
        title: 'Choose your element row',
        input: 'select',
        inputOptions: menu,
        buttonsStyling: false,
        showDenyButton: true,
        denyButtonText: `Delete This Element`,
        confirmButtonText: `Done`,
        inputLabel: 'Row list',
        customClass: {
          popup:
            'px-6 py-[15px] pb-16 flex bg-mint border border-cream rounded-2xl',
          title: 'text-darkgrey mb-[15px]',
          inputLabel: 'mt-0 w-full inline text-cherry text-2xl',
          input:
            'm-0 mb-[15px] bg-lightpink border-2 rounded-2xl shadow-lg border border-[#FAFEFF]',
          actions: 'flex flex-row gap-x-[12px] gap-y-[15px] w-full',
          confirmButton:
            'h-[33px] order-3 bg-peach text-white min-w-[168px] rounded-2xl shadow-lg border border-[#FAFEFF]',
          cancelButton:
            'h-[33px] order-2 bg-cherry text-white min-w-[112px] rounded-2xl shadow-lg border border-[#FAFEFF]',
          denyButton:
            'h-[33px] order-1 bg-winered text-white w-full min-w-[70px] rounded-2xl shadow-lg border border-[#FAFEFF]',
        },
        inputPlaceholder: 'Select a row',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value.length == 0) return resolve();
            handleSelectRowTop(value, elementId);
            resolve();
          });
        },
      }).then((result) => {
        if (result.isDenied) {
          handleRemoveElement(elementId, items.length - 1);
        }
      });
    }
  };

  const handleAddElement = async () => {
    await Swal.fire({
      inputLabel: 'Title Name',
      html: `
      <div class='flex flex-col gap-y-[15px]'>
        <div class='text-3xl text-darkgrey'>
          Add new Element
        </div>
        <div class='text-left'>
          <p class='text-xl text-cherry'>Title Name</p>
          <div class='w-full h-[36px] rounded-2xl border-1 border-white bg-lightpink flex gap-5 items-center shadow-lg'>
              <input
                id="swal-input1"
                tabindex="0"
                class="w-full bg-transparent text-darkgrey placeholder-peach placeholder:text-left pl-5 pr-5 rounded-xl focus:ring-0 focus:ring-offset-0 "
                type="text"
                placeholder='Title Name'
              />
          </div>
        </div>
        <div class='text-left'>
          <p class='text-xl text-cherry'>Upload Image</p>
          <input id="swal-input2"
          tabindex="0"
          accept='.jpeg, .png, .jpg'
          type="file" class="pb-1 h-[36px] bg-lightpink rounded-full border border-[#fafeff]/50 block w-full text-sm
            file:mr-4 file:py-2 file:px-4
            file:rounded-l-full file:border-0
            file:text-sm file:font-semibold
          file:bg-peach file:text-cream
          hover:file:bg-peach/50
          "/>
        </div>
      </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        popup:
          'px-5 pt-[46px] pb-[50px] flex flex-col bg-mint border border-cream rounded-lg',
        htmlContainer: 'mx-0',
        actions: 'flex gap-x-[12px] w-full',
        confirmButton:
          'bg-peach py-2 px-[20px] text-white w-[150px] font-bold rounded-full shadow-lg border border-[#FAFEFF]',
        cancelButton:
          'bg-cherry py-2 px-[20px] text-white w-[100px] font-bold rounded-full shadow-lg border border-[#FAFEFF]',
        validationMessage: 'my-validation-message',
      },
      preConfirm: () => {
        const title = document.getElementById('swal-input1').value;
        const file = document.getElementById('swal-input2').files[0];
        if (title.length == 0) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Title name is required'
          );
          return;
        } else if (!file) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Image is required'
          );
          return;
        }
        return [title, file];
      },
    }).then((data) => {
      // user click confirm button
      if (data.isConfirmed) {
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
