import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
import SortableItem from './sortableItem';
import Image from 'next/image';
import ImageIcon from '@/app/components/imageIcon';

export default function Container(props) {
  const { id, items } = props;
  const { isOver, setNodeRef, attributes } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className={`${props.className}`} {...attributes}>
      <SortableContext id={id} items={items}>
        {items.map((item) => {
          return (
            <SortableItem
              isSpawner={props.isSpawner}
              isRow={false}
              parentID={id}
              rowIndex={props.rowIndex}
              onRemove={props.onRemove}
              isEditable={props.isEditable}
              id={item.id}
              key={item.id} // don't change key because somehow animetion will change
              item={item}
              className={`${props.itemClassName}`}
            >
              {
                props.isSpawner ? (
                  <ImageIcon
                    elementId={item.id}
                    handleSelectRow={props?.handleSelectRow}
                    id={item.id}
                    rowIndex={props.rowIndex}
                    onRemove={props.onRemove}
                    img={item.pictuerUrl}
                    imgName={item.title}
                    tierRow={props?.rows.slice(0, -1)}
                  />
                ) : (
                  <Image
                    priority={true}
                    src={item.pictuerUrl}
                    fill={true}
                    quality={100}
                    className='rounded-lg object-cover'
                    alt={item.title}
                  />
                )
                // <div className='w-full h-full flex text-center'>
                //   {item.title} + {item.id}
                // </div>
              }
            </SortableItem>
          );
        })}
      </SortableContext>
    </div>
  );
}
