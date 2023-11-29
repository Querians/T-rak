import Container from '@/app/components/container';
import Swal from 'sweetalert2';

export default function Spawner(props) {
  const { items, handleRemoveElement } = props;
  const handleSelectRow = (selectRowId, selectElementId) => {
    props?.setItems((prev) => {
      const rowIndex = props?.rows?.findIndex((row) => row.id === selectRowId);
      const elementIndex = props?.rows[prev.length - 1]?.elements?.findIndex(
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

  const handleAddElement = async () => {
    await Swal.fire({
      // title: "Multiple inputs",
      inputLabel: 'Title Name',
      html: `
        <label htmlFor='titleElement'>Title Name</label>
        <input name='titleElement' id="swal-input1" class="swal2-input w-full m-0">
        <label htmlFor='elementFile'>Add Photo</label>
        <input name='elementFile' id="swal-input2" type="file" class="swal2-input w-full m-0">
      `,
      focusConfirm: false,
      customClass: {
        popup:
          'px-5 py-[15px] flex flex-col gap-[15px] bg-mint border border-cream rounded-lg',
      },
      showCancelButton: true,
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
        console.log(data.value[1]);
        props.setItems((prev) => {
          return [
            ...prev.slice(0, -1),
            {
              ...prev[prev.length - 1],
              elements: [
                {
                  elementId: -2,
                  id: new Date().getTime().toString(),
                  title: data.value[0],
                  description: `This is ${data.value[0]}`,
                  pictureUrl: data.value[1],
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
      }  fixed inset-x-0 bottom-0 z-10 h-[152px] rounded-t-[10px] bg-cherry`}
    >
      {/* <div className='absolute z-10 bottom-[40px] left-1/2 transform -translate-x-1/2 flex items-end w-[325px] mt-96 overflow-y-visible overflow-x-scroll'> */}
      <Container
        rows={props?.rows}
        isSpawner={true}
        isEditable={true}
        rowIndex={items.length - 1}
        handleAddElement={handleAddElement}
        handleSelectRow={handleSelectRow}
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
