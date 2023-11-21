import React, { useState } from 'react';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

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
    setActivatorNodeRef,
    setNodeRef,
  } = useSortable({
    animateLayoutChanges,
    id: props.id,
    disabled: !props.isEditable,
  });
  const [isClick, setIsClick] = useState(false);

  const { children } = props;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
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
            className={`flex h-full w-[90px] shrink-0 items-center justify-center rounded-bl-lg rounded-tl-lg text-center text-lg font-bold text-darkgrey bg-[${props.row.color}] shadow-lg`}
          >
            {props?.row?.label}
          </div>
          <div className='w-full overflow-auto '>{children}</div>
        </>
      ) : (
        <div
        // className={`flex h-full w-full rounded-md`}
        >
          {props.onRemove && isClick && props.isEditable && (
            <button
              onClick={() => {
                props.onRemove(props.id, props.rowIndex);
              }}
            >
              <Image
                src='/delete.svg'
                width={20}
                height={20}
                alt={'delete button'}
                className='absolute -right-2 -top-2 z-10'
              />
            </button>
          )}
          <div
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            onFocus={(e) => setIsClick(!isClick)}
            onBlur={(e) => {
              setTimeout(function () {
                setIsClick(false);
              }, 50);
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
