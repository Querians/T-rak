import React, { useState } from 'react';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const animateLayoutChanges = (args) => {
  return args.isSorting || args.wasDragging
    ? defaultAnimateLayoutChanges(args)
    : true;
};

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setDraggableNodeRef,
    setDroppableNodeRef,
    setActivatorNodeRef,
    setNodeRef,
  } = useSortable({
    animateLayoutChanges,
    id: props.id,
    disabled: props.isDisable,
  });

  const { children } = props;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    // <div ref={setDroppableNodeRef}  className={`${isDragging && 'opacity-50'} w-full `}>
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging && 'opacity-50'} w-full ${props.className} `}
    >
      {props.isRow ? (
        <>
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            className={`h-full w-[100px] basis-1/4 rounded-md bg-gray-400`}
          >
            drag me
          </div>
          <div className='basis-3/4 overflow-auto'>{children}</div>
        </>
      ) : (
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          className={`flex h-full w-full flex-nowrap overflow-auto rounded-md bg-gray-400 `}
        >
          {children}
        </div>
      )}
    </div>
    // </div>
    // <div ref={setDroppableNodeRef} style={style} className={`${isDragging && 'opacity-50'} w-full h-full`}>
    //   <div ref={setDraggableNodeRef} className={`${props.className}`}>
    //     <div ref={setActivatorNodeRef} {...listeners} {...attributes} className={`bg-gray-400 rounded-md flex`}>
    //       {/* drag me */}
    //       {props.isRow ? `drag m111e` : children}
    //     </div>
    //     {/* {
    //       props.onRemove &&
    //       <button onClick={()=>{
    //         props.onRemove(props.id, props.parentID)
    //       }} className='bg-red-700 rounded-md'>
    //         delete me
    //       </button>
    //     } */}
    //     {
    //       props.isRow && children
    //     }

    //   </div>
    // </div>
  );
}
