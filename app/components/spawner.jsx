import Container from '@/app/components/container';

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

  return (
    // if we use overflow-x-auto the menu will disappear dueto overflow. Even we do only overflow-"x-auto
    <div
      className={`transition ${
        !props.isEditable && 'translate-y-full opacity-0'
      }  fixed inset-x-0 bottom-0 z-10 min-h-[152px] rounded-t-[10px] bg-cherry`}
    >
      <Container
        rows={props?.rows}
        isSpawner={true}
        isEditable={true}
        rowIndex={items.length - 1}
        handleSelectRow={handleSelectRow}
        onRemove={handleRemoveElement}
        id={items[items.length - 1].id}
        items={items[items.length - 1].elements}
        className={`flex shrink-0 gap-x-[15px] px-5 py-4 `}
        itemClassName={`relative w-[70px] h-[70px] grow-0 shrink-0 rounded-xl shadow-lg`}
      />
    </div>
  );
}
