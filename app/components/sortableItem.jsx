import React, { useState } from 'react';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import Link from 'next/link';

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
  let bgColor = '';
  if (props.isRow) {
    bgColor = props.row.color;
  }

  const defaultColor = {
    FABEBE: 'bg-[#FABEBE]',
    FAD4BE: 'bg-[#FAD4BE]',
    FAE6BE: 'bg-[#FAE6BE]',
    F2FABE: 'bg-[#F2FABE]',
    D8FABE: 'bg-[#D8FABE]',
    BEFAE4: 'bg-[#BEFAE4]',
    BEECFA: 'bg-[#BEECFA]',
    BED2FA: 'bg-[#BED2FA]',
    '': '',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging && 'opacity-50'} ${props.className} `}
    >
      {props.isRow ? (
        <>
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            className={`text-md flex h-full w-[90px] shrink-0 items-center justify-center rounded-bl-lg rounded-tl-lg px-2 text-center font-bold text-darkgrey shadow-lg  ${defaultColor[bgColor]}`}
          >
            {!props.isEditable ? (
              <Link
                className='overflow-hidden'
                href={`/tierlist/edit/${props?.tierListId}/${props.id}`}
              >
                {props?.row?.label}
              </Link>
            ) : (
              <div className='overflow-hidden '>{props?.row?.label}</div>
            )}
          </div>
          <div className='w-full snap-x overflow-auto'>{children}</div>
        </>
      ) : (
        <div>
          {!props.isSpawner ? (
            <>
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
            </>
          ) : (
            <div {...listeners} {...attributes}>
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
