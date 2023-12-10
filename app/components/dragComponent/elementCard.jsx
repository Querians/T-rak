import Image from 'next/image';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const animateLayoutChanges = (args) => {
  return args.isSorting || args.wasDragging
    ? defaultAnimateLayoutChanges(args)
    : true;
};

export default function ElementCard(props) {
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
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${
        isDragging && 'opacity-50'
      } flex h-[92px] w-full snap-center items-center justify-between rounded-2xl border border-[#FAFEFF] bg-lightpink p-2.5 shadow-lg`}
    >
      <div
        className={` flex items-center ${
          !props.isEditable ? 'gap-x-3' : 'gap-x-2.5'
        } `}
      >
        <Image
          id={props.id}
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          src={'/dragger.svg'}
          width={15}
          height={23}
          alt={'dragger icon'}
          className={`${!props.isEditable && 'hidden'}`}
        />
        <div className=' relative h-[70px] w-[70px] rounded-[10px] bg-[#D9D9D9]'>
          <Image
            src={props.src}
            priority={true}
            sizes='70px'
            className='shrink-0 rounded-2xl object-cover'
            fill={true}
            alt={props.title || 'title'}
          />
        </div>
        <div
          className={`text-lg font-bold ${
            props.isEditable ? 'max-w-[110px]' : 'max-w-[200px]'
          }  truncate `}
        >
          {props.title}
        </div>
      </div>
      <button
        disabled={!props.isEditable}
        onClick={() => {
          props.handleRemoveElement(props.id, 0);
        }}
        className={`transition ${
          !props.isEditable ? 'opacity-0' : 'opacity-100'
        } fadeIn flex h-full w-[50px] shrink-0 items-center justify-center rounded-[15px] border border-[#FAFEFF] bg-winered shadow-lg`}
      >
        <Image
          src='/iconTrash.svg'
          width={0}
          height={0}
          alt={'trash icon'}
          className='h-[18px] w-[18px]'
          quality={100}
        />
      </button>
    </div>
  );
}
