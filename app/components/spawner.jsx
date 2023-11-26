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
    <div
      className={`transition ${
        !props.isEditable && 'translate-y-full opacity-0'
      } fixed inset-x-0 bottom-0 z-10 h-[152px] w-full rounded-[10px] bg-cherry`}
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
        className={`flex h-full w-full shrink-0 gap-x-[15px] px-5 py-4 `}
        itemClassName={`relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-xl shadow-lg`}
      />
    </div>
  );
}
