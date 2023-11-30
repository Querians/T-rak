'use client';
import Header from '@/app/components/header';
import ElementCard from '@/app/components/elementCard';
import Spawner from '@/app/components/spawner';
import { useState, useEffect } from 'react';
import {
  DndContext,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  handleDragEnd,
  handleDragStart,
  handleRemoveElement,
} from '@/utils/tierList/handler';
import Image from 'next/image';

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export default function RowDragable(props) {
  const { items, setItems, isEditable } = props;
  const [activeId, setActiveId] = useState(null); // for over lay

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200, // millisec
      tolerance: 2,
    },
  }); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200, // millisec
      tolerance: 2,
    },
  }); // Initialize touch sensor
  const sensors = useSensors(touchSensor, mouseSensor);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const handleDragOver = (e, setItems, items) => {
    console.log('enver', e);
    if (
      e.over?.data?.current?.sortable?.containerId ==
        e.active?.data?.current?.sortable?.containerId ||
      Math.abs(e.delta.y) < 40
    ) {
      return;
    }

    if (e.over && e.over.id == -1 && items[1].elements.length == 0) {
      setItems((prev) => {
        const containerActiveId = e.active.data.current.sortable.containerId;
        const containerActiveIndex = items.findIndex(
          (row) => row.id == containerActiveId
        );
        const activeElementIndex = e.active.data.current.sortable.index;
        return [
          ...prev.slice(0, containerActiveIndex),
          {
            ...prev[containerActiveIndex],
            elements: prev[containerActiveIndex].elements.filter(
              (element) => element.id !== e.active.id
            ),
          },
          ...prev.slice(containerActiveIndex + 1, -1),
          {
            ...prev[prev.length - 1],
            elements: [prev[containerActiveIndex].elements[activeElementIndex]],
          },
        ];
      });
    }

    if (e.over == null && items[0].elements.length == 0) {
      setItems((prev) => {
        const containerActiveId = e.active.data.current.sortable.containerId;
        const containerActiveIndex = items.findIndex(
          (row) => row.id == containerActiveId
        );
        const activeElementIndex = e.active.data.current.sortable.index;
        return [
          {
            ...prev[0],
            elements: [prev[containerActiveIndex].elements[activeElementIndex]],
          },
          {
            ...prev[containerActiveIndex],
            elements: prev[containerActiveIndex].elements.filter(
              (element) => element.id !== e.active.id
            ),
          },
        ];
      });
    }

    if (
      (!e.active?.data?.current?.sortable?.index &&
        e.active?.data?.current?.sortable?.index != 0) ||
      (!e.over?.data?.current?.sortable?.index &&
        e.over?.data?.current?.sortable?.index != 0) ||
      e.over?.id == e.active?.id
    ) {
      return;
    }
    const containerActiveId = e.active.data.current.sortable.containerId;
    const containerActiveIndex = items.findIndex(
      (row) => row.id == containerActiveId
    );
    const containerOverIndex = containerActiveIndex == 0 ? 1 : 0;

    const activeElementId = e.active.id;
    const activeElementIndex = e.active.data.current.sortable.index;
    const overElementIndex = e.over.data.current.sortable.index;
    if (containerActiveIndex > containerOverIndex) {
      setItems((prev) => {
        return [
          {
            ...prev[containerOverIndex],
            ['elements']: [
              ...prev[containerOverIndex].elements.slice(0, overElementIndex),
              prev[containerActiveIndex].elements[activeElementIndex],
              ...prev[containerOverIndex].elements.slice(
                overElementIndex,
                prev[containerOverIndex].elements.length
              ),
            ],
          },
          {
            ...prev[1],
            ['elements']: prev[1].elements.filter(
              (element) => element.id != activeElementId
            ),
          },
        ];
      });
    } else {
      setItems((prev) => {
        return [
          {
            ...prev[0],
            ['elements']: prev[0].elements.filter(
              (element) => element.id != activeElementId
            ),
          },
          {
            ...prev[containerOverIndex],
            ['elements']: [
              ...prev[containerOverIndex].elements.slice(0, overElementIndex),
              prev[containerActiveIndex].elements[activeElementIndex],
              ...prev[containerOverIndex].elements.slice(
                overElementIndex,
                prev[containerOverIndex].elements.length
              ),
            ],
          },
        ];
      });
    }
  };

  const row = items.filter(
    (row) => row.elements.find((element) => element.id == activeId) != undefined
  )[0];
  const activeRowIndex = items.findIndex((x) => x.id == row?.id);
  const activeElementIndex = row?.elements?.findIndex(
    (element) => element.id == activeId
  );
  const activeElementUrl = row?.elements[activeElementIndex].toShowSrc;
  const activeElementTitle = row?.elements[activeElementIndex].title;

  return (
    <DndContext
      id='elements sortable'
      collisionDetection={pointerWithin}
      onDragStart={(e) => {
        handleDragStart(e, setActiveId);
      }}
      onDragOver={(e) => {
        handleDragOver(e, setItems, items);
      }}
      onDragEnd={(e) => {
        handleDragEnd(e, setItems, items, setActiveId);
      }}
      measuring={measuringConfig}
      autoScroll={true}
      sensors={sensors}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        id={items[0].id}
        items={items[0].elements}
      >
        <div
          className={`mx-4 mt-5 flex transition-[height] ${
            isEditable ? 'h-2/3' : 'h-[85%]'
          }  flex-col items-center gap-y-2.5 overflow-y-auto rounded-[20px] px-1 pb-1`}
        >
          {items[0].elements.map((element) => {
            return (
              <ElementCard
                id={element.id}
                key={element.id}
                title={element.title}
                src={element.toShowSrc}
                isEditable={isEditable}
                handleRemoveElement={(id, parentIndex) => {
                  handleRemoveElement(id, parentIndex, setItems);
                }}
              />
            );
          })}
        </div>
      </SortableContext>
      <div>
        <Spawner
          setItems={setItems}
          isEditable={isEditable}
          items={items}
          handleRemoveElement={(id, parentIndex) => {
            handleRemoveElement(id, parentIndex, setItems);
          }}
        />
      </div>
      <DragOverlay
        dropAnimation={{
          duration: 200,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}
      >
        {activeRowIndex == 1 || (!activeRowIndex && activeRowIndex != 0) ? (
          <div className='relative h-[70px] w-[70px] rounded-lg object-cover shadow-lg'>
            <Image
              priority={true}
              src={activeElementUrl}
              fill={true}
              quality={100}
              className='rounded-lg object-cover shadow-lg'
              alt={activeElementTitle + 'pic'}
            />
          </div>
        ) : (
          <div className='min-w-[320px]'>
            <ElementCard
              id={activeId}
              isEditable={isEditable}
              title={activeElementTitle}
              src={activeElementUrl}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
