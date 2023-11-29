import { DragOverlay } from '@dnd-kit/core';
import TierListRow from '@/app/components/tierListRow';
import Image from 'next/image';

export default function DragOverLayTierList({ items, activeId }) {
  const row = items.filter(
    (row) => row.elements.find((element) => element.id == activeId) != undefined
  )[0];
  const activeRowIndex = items.findIndex((row) => row.id == activeId);
  const activeElementIndex = row?.elements?.findIndex(
    (element) => element.id == activeId
  );
  const activeElementUrl = row?.elements[activeElementIndex].toShowSrc;
  return (
    <DragOverlay
      dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
      }}
    >
      {items.findIndex((row) => row.id == activeId) == -1 ? (
        <Image
          priority={true}
          src={activeElementUrl}
          fill={true}
          quality={100}
          className='rounded-lg object-cover shadow-lg'
          alt={
            items[activeRowIndex]?.elements[activeElementIndex]?.title + 'pic'
          }
        />
      ) : (
        <div>
          <TierListRow row={items[activeRowIndex]} />
        </div>
      )}
    </DragOverlay>
  );
}
