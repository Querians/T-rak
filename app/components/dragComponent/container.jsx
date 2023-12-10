import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import SortableItem from './sortableItem';
import Image from 'next/image';
import ImageIcon from '@/app/components/imageIcon';
import { Button } from '@nextui-org/react';

export default function Container(props) {
  const { id, items } = props;
  const { isOver, setNodeRef, attributes } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className={`${props.className}`} {...attributes}>
      {props.isSpawner && (
        <Button
          onClick={props.handleAddElement}
          isIconOnly={true}
          className='relative z-10 h-[70px] w-[70px] shrink-0 rounded-xl bg-lightpink shadow-lg'
        >
          <Image src='/plus.svg' width={40} height={40} alt={'add new image'} />
        </Button>
      )}
      <SortableContext id={id} items={items}>
        {items.map((item) => {
          return (
            <SortableItem
              tierListId={props?.tierListId}
              isSpawner={props.isSpawner}
              isRow={false}
              parentID={id}
              rowIndex={props.rowIndex}
              onRemove={props.onRemove}
              isEditable={props.isEditable}
              id={item.id}
              key={item.id} // don't change key because somehow animation will change
              item={item}
              className={`${props.itemClassName}`}
            >
              {
                props.isSpawner ? (
                  <ImageIcon
                    elementId={item.id}
                    handleMenu={props?.handleMenu}
                    id={item.id}
                    rowIndex={props.rowIndex}
                    onRemove={props.onRemove}
                    img={item.toShowSrc}
                    imgName={item.title}
                    tierRow={props?.rows.slice(0, -1)}
                  />
                ) : (
                  <Image
                    id={item.id}
                    priority={true}
                    src={item.toShowSrc}
                    fill={true}
                    sizes={'70px'}
                    quality={100}
                    className={`rounded-lg object-cover ${
                      !props.isEditable && 'snap-center'
                    }`}
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
