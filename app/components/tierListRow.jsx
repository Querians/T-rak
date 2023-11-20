import SortableItem from '@/app/components/sortableItem';
import Container from '@/app/components/container';

export default function TierListRow(props) {
  const { row, rowIndex, handleRemoveElement, isEditable } = props;
  return (
    <SortableItem
      id={row.id}
      rowIndex={rowIndex}
      key={row.id}
      isEditable={isEditable}
      items={row.elements}
      row={row}
      isRow={true}
      className={`flex h-[90px] w-full gap-[5px] rounded-xl border border-[#F1EEE7] bg-[#F1EEE7] pr-1 shadow-lg`}
    >
      <Container
        isEditable={props.isEditable}
        rowIndex={rowIndex}
        key={row.id}
        onRemove={handleRemoveElement}
        id={row.id}
        items={row.elements}
        className={`flex h-full w-full shrink-0 items-center gap-x-[5px] `}
        itemClassName={`relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-xl shadow-lg`}
      />
    </SortableItem>
  );
}
