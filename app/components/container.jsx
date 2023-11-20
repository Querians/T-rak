import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
import SortableItem from './sortableItem';
import Image from 'next/image';

export default function Container(props) {
  const { id, items } = props;
  // const {
  //   attributes,
  //   listeners,
  //   transform,
  //   transition,
  //   setDraggableNodeRef,
  //   setDroppableNodeRef,
  //   setNodeRef: setNodeRefSortable,
  // } = useSortable({ id: id });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  // useEffect(()=>{
  //   console.log(isOver)
  // },[isOver])

  return (
    // <div ref={setNodeRef} id={`${id}+asd`} className={`${props.className}`}>
    <div
      // ref={setNodeRefSortable}
      ref={setNodeRef}
      className={`${props.className}`}
      // style={style}
      // {...attributes}
    >
      <SortableContext id={id} items={items}>
        {/* <div className={`overflow-auto`}> */}
        {items.map((item) => {
          return (
            <SortableItem
              isRow={false}
              parentID={id}
              rowIndex={props.rowIndex}
              onRemove={props.onRemove}
              isEditable={props.isEditable}
              key={item.id}
              id={item.id}
              item={item}
              className={`${props.itemClassName}`}
            >
              <Image
                priority={true}
                src={item.pictuerUrl}
                fill={true}
                quality={100}
                className='rounded-lg object-cover'
                alt={item.title}
              />
              {/* <div className='w-full h-full flex text-center'>
                {item.title} + {item.id}
              </div> */}
            </SortableItem>
          );
        })}
        {/* </div> */}
      </SortableContext>
    </div>
    // </div>
  );
}
