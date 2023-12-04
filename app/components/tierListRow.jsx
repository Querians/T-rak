import SortableItem from '@/app/components/sortableItem';
import Container from '@/app/components/container';

export default function TierListRow(props) {
  const { row, rowIndex, handleRemoveElement, isEditable } = props;
  return (
    <SortableItem
      id={row.id}
      rowIndex={rowIndex}
      key={row.id}
      tierListId={props.tierListId}
      isEditable={isEditable}
      items={row.elements}
      row={row}
      isRow={true}
      className={`transition ${
        rowIndex > props.lastIndexOriginal &&
        row.id != -1 &&
        !props?.isOverLay &&
        isEditable &&
        'animate-fadeIn'
      } ${
        !isEditable && 'snap-center'
      } flex h-[90px] w-full shrink-0 gap-[5px] rounded-xl border border-[#F1EEE7] bg-[#F1EEE7] pr-1 shadow-lg `}
    >
      <Container
        isEditable={props.isEditable}
        rowIndex={rowIndex}
        key={row.id}
        onRemove={handleRemoveElement}
        id={row.id}
        items={row.elements}
        className={`flex h-full w-full shrink-0 items-center gap-x-[5px]`}
        itemClassName={`shrink-0 relative w-[70px] h-[70px] rounded-xl shadow-lg`}
      />
    </SortableItem>
  );
}
