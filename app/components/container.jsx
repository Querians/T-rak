import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableItem from './sortableItem';
import Image from 'next/image';

export default function Container(props) {
  const { id, items } = props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    setDraggableNodeRef,
    setDroppableNodeRef,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  // useEffect(()=>{
  //   console.log(isOver)
  // },[isOver])

  return (
    // <div ref={setNodeRef} id={`${id}+asd`} className={`${props.className}`}>
    <div
      ref={[setDroppableNodeRef, setNodeRef, setDraggableNodeRef]}
      className={`${props.className}`}
      style={style}
      {...attributes}
    >
      <SortableContext id={id} items={items}>
        {/* <div className={`overflow-auto`}> */}
        {items.map((item) => {
          return (
            <SortableItem
              isRow={false}
              parentID={id}
              onRemove={props.onRemove}
              isDisable={item.isDisable}
              key={item.id}
              id={item.id}
              item={item}
              className={`${props.itemClassName}`}
            >
              <Image
                priority={true}
                src={'/vercel.svg'}
                // width={70}
                // height={70}
                fill={true}
                quality={100}
                className='object-cover'
                alt={item.title}
              />
            </SortableItem>
          );
        })}
        {/* </div> */}
      </SortableContext>
    </div>
    // </div>
  );
}
