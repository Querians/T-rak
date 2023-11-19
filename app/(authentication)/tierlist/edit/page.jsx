'use client';
import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Container from '../../../components/container';
import SortableItem from '../../../components/sortableItem';
import { SortableContext } from '@dnd-kit/sortable';
import { data } from './data';
import Image from 'next/image';

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export default function TierList() {
  const [items, setItems] = useState(data);
  const [activeId, setActiveId] = useState(null);

  // const handleRemoveRow = (id) => setItems((rows) => rows.filter((row) => row.id !== id));
  const handleRemoveElement = (id, parentIndex) => {
    console.log(parentIndex);
    console.log('id', id);
    setItems((prev) => {
      return [
        ...prev.slice(0, parentIndex),
        {
          ...prev[parentIndex],
          elements: prev[parentIndex].elements.filter(
            (element) => element.id !== id
          ),
        },
        ...prev.slice(parentIndex + 1, prev.length),
      ];
    });
  };

  function findContainer(id) {
    if (items.find((container) => container.id == id)) {
      return id;
    }

    return items.find((row) =>
      row.elements.find((element) => element.id == id)
    );
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id;

    // Find the containers
    // console.log('---')
    // console.log("event", event);
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    // console.log('overId', overId)
    // console.log("activeContainer", activeContainer);
    // console.log("overContainer", overContainer);
    const isSpawner = event.over?.id == 'spawner';

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // drag element to empty row
    if (
      typeof overContainer === 'string' &&
      typeof activeContainer === 'object'
    ) {
      // console.log('---');
      // console.log('event', event);

      const activeContainerIndex = items.findIndex(
        (row) => row.id == activeContainer.id
      );
      const activeElementIndex = event.active.data.current.sortable.index;

      // drag to spawner row
      if (isSpawner && items[items.length - 1].elements.length == 0) {
        setItems((prev) => {
          return [
            ...prev.slice(0, activeContainerIndex),
            {
              ...prev[activeContainerIndex],
              elements: prev[activeContainerIndex].elements.filter(
                (element) => element.id !== id
              ),
            },
            ...prev.slice(activeContainerIndex + 1, -1),
            {
              ...prev[prev.length - 1],
              elements: [
                prev[activeContainerIndex].elements[activeElementIndex],
              ],
            },
          ];
        });
        return;
      }
      if (!isSpawner) {
        const overContainerIndex = event.over.data.current.sortable.index;
        if (items[overContainerIndex].elements.length == 0) {
          // console.log('---');
          // console.log('event', event);
          // console.log("activeContainer", activeContainer);
          // console.log('activeContainerIndex', activeContainerIndex);
          // console.log('activeElementIndex', activeElementIndex);
          // console.log('overContainerIndex', overContainerIndex);
          setItems((prev) => {
            const add = {
              ...prev[overContainerIndex],
              ['elements']: [
                prev[activeContainerIndex].elements[activeElementIndex],
              ],
            };

            const remove = {
              ...prev[activeContainerIndex],
              ['elements']: prev[activeContainerIndex].elements.filter(
                (element) => element.id !== id
              ),
            };

            if (activeContainerIndex > overContainerIndex) {
              return [
                ...prev.slice(0, overContainerIndex),
                add,
                ...prev.slice(overContainerIndex + 1, activeContainerIndex),
                remove,
                ...prev.slice(activeContainerIndex + 1, prev.length),
              ];
            } else {
              return [
                ...prev.slice(0, activeContainerIndex),
                remove,
                ...prev.slice(activeContainerIndex + 1, overContainerIndex),
                add,
                ...prev.slice(overContainerIndex + 1, prev.length),
              ];
            }
          });
        }
      }

      return;
    }

    // swap row
    // console.log("activeContainer", activeContainer);
    // console.log("overContainer", overContainer);
    if (
      typeof activeContainer === 'string' &&
      (overContainer == 'spawner' || overContainer?.id == 'spawner')
    ) {
      // console.log('spawner')
      return;
    }
    if (
      typeof activeContainer === 'string' &&
      !(overContainer == 'spawner' || overContainer?.id == 'spawner')
    ) {
      const activeRowIndex = event.active.data.current.sortable.index;
      const overRowIndex =
        typeof overContainer === 'string'
          ? event.over.data.current.sortable.index
          : activeRowIndex;
      // console.log('activeRowIndex', activeRowIndex)
      // console.log('overRowIndex', overRowIndex)
      setItems((prev) => {
        return arrayMove(prev, activeRowIndex, overRowIndex);
      });
      return;
    }

    // move element to difference row
    const activeContainerIndex = items?.findIndex(
      (container) => container.id == activeContainer.id
    );
    let overContainerIndex = items?.findIndex(
      (container) =>
        container.elements?.filter((element) => element.id == overId).length ==
        1
    );
    const activeIndex = event.active.data.current?.sortable?.index;
    const overIndex = event.over.data.current?.sortable?.index;
    if (
      !items[overContainerIndex] ||
      !items[overContainerIndex].elements ||
      !items[overContainerIndex].label ||
      (activeIndex != 0 && !activeIndex) ||
      (overIndex != 0 && !overIndex) ||
      !overId
    ) {
      return;
    }
    setItems((prev) => {
      const add = prev[activeContainerIndex].elements[activeIndex];
      if (overContainerIndex < activeContainerIndex) {
        return [
          ...prev.slice(0, overContainerIndex),
          {
            ...prev[overContainerIndex],
            elements: [
              ...prev[overContainerIndex].elements.slice(0, overIndex),
              add,
              ...prev[overContainerIndex].elements.slice(
                overIndex,
                prev[overContainerIndex].elements.length
              ),
            ],
          },
          ...prev.slice(overContainerIndex + 1, activeContainerIndex),
          {
            ...prev[activeContainerIndex],
            elements: [
              ...prev[activeContainerIndex].elements.filter(
                (element) => element.id !== active.id
              ),
            ],
          },
          ...prev.slice(activeContainerIndex + 1, prev.length),
        ];
      } else {
        return [
          ...prev.slice(0, activeContainerIndex),
          {
            ...prev[activeContainerIndex],
            elements: [
              ...prev[activeContainerIndex].elements.filter(
                (element) => element.id !== active.id
              ),
            ],
          },
          ...prev.slice(activeContainerIndex + 1, overContainerIndex),
          {
            ...prev[overContainerIndex],
            elements: [
              ...prev[overContainerIndex].elements.slice(0, overIndex),
              add,
              ...prev[overContainerIndex].elements.slice(
                overIndex,
                prev[overContainerIndex].elements.length
              ),
            ],
          },
          ...prev.slice(overContainerIndex + 1, prev.length),
        ];
      }
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    // console.log("----------------");
    // console.log("this", event);
    // console.log("activeID", id);
    // console.log("overID", overId);
    // console.log("activeContainer", activeContainer);
    // console.log("overContainer", overContainer);
    // console.log("overID", event.over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer ||
      typeof activeContainer === 'string'
    ) {
      return;
    }

    const activeIndex = activeContainer?.elements?.findIndex(
      (element) => element.id == active.id
    );

    const overIndex = overContainer?.elements?.findIndex(
      (element) => element.id == overId
    );

    const containerIndex = items?.findIndex(
      (container) =>
        container.elements.filter((element) => element.id == overId).length == 1
    );
    // console.log('containerIndex', containerIndex)
    // console.log('items[containerIndex]', items[containerIndex])
    setItems((prev) => [
      ...prev.slice(0, containerIndex),
      {
        // id: prev[containerIndex].id,
        // label: prev[containerIndex].label,
        ...prev[containerIndex],
        elements: arrayMove(
          prev[containerIndex].elements,
          activeIndex,
          overIndex
        ),
      },
      ...prev.slice(containerIndex + 1, prev.length),
    ]);
    setActiveId(null);
  }

  useEffect(() => {
    console.log('items=', items);
  }, [items]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 1, // millisec
    },
  }); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 1, // millisec
    },
  }); // Initialize touch sensor
  const sensors = useSensors(touchSensor, mouseSensor);

  // const activeID = 'c5'
  // const row = items.filter(row => row.elements.find(element => element.id == activeID) != undefined)
  // console.log(row)
  // console.log(row[0].elements[row[0]?.elements?.findIndex(element => element.id == activeID)].pictuerURL)
  // console.log(items.filter(row => row.elements.find(element => element.id == activeID) != undefined)[0].elements[items.filter(row => row.elements.find(element => element.id == activeID) != undefined)[0]?.elements?.findIndex(element => element.id == activeID)].pictuerURL)

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={measuringConfig}
      modifiers={[restrictToWindowEdges]}
      autoScroll={true}
      sensors={sensors}
    >
      <div className='mt-3.5 flex w-full flex-col gap-y-2 rounded-[20px] bg-cream px-4 pt-[27px]'>
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
          {items.map((row, index) => {
            if (index == items.length - 1) {
              return;
            }
            return (
              <SortableItem
                id={row.id}
                parentIndex={index}
                key={row.id}
                isDisable={row.isDisable}
                items={row.elements}
                row={row}
                isRow={true}
                className={`flex h-[90px] w-full gap-[5px] rounded-xl border border-[#F1EEE7] bg-[#F1EEE7] pr-1 shadow-lg`}
              >
                <Container
                  parentIndex={index}
                  key={row.id}
                  onRemove={handleRemoveElement}
                  id={row.id}
                  items={row.elements}
                  className={`flex h-full w-full shrink-0 items-center gap-x-[5px] `}
                  itemClassName={`relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-xl shadow-lg`}
                />
              </SortableItem>
            );
          })}
          <div className='fixed inset-x-0 bottom-0 h-[152px] w-full rounded-[10px] bg-cherry'>
            <Container
              parentIndex={items.length - 1}
              onRemove={handleRemoveElement}
              id={items[items.length - 1].id}
              items={items[items.length - 1].elements}
              className={`flex h-full w-full shrink-0 gap-x-[15px] px-5 py-4 `}
              itemClassName={`relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-xl shadow-lg`}
            />
          </div>

          <DragOverlay
            dropAnimation={{
              duration: 200,
              easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}
          >
            {items.findIndex((row) => row.id == activeId) == -1 ? (
              <div>
                <Image
                  priority={true}
                  src={
                    items.filter(
                      (row) =>
                        row?.elements.find(
                          (element) => element.id == activeId
                        ) != undefined
                    )[0]?.elements[
                      items
                        .filter(
                          (row) =>
                            row.elements.find(
                              (element) => element.id == activeId
                            ) != undefined
                        )[0]
                        ?.elements?.findIndex(
                          (element) => element.id == activeId
                        )
                    ].pictuerUrl
                  }
                  fill={true}
                  quality={100}
                  className='rounded-lg object-cover shadow-lg'
                  alt={'sdfsdf'}
                />
              </div>
            ) : (
              <div>
                <SortableItem
                  id={activeId}
                  parentIndex={items.findIndex((row) => row.id == activeId)}
                  items={items.find((row) => row.id == activeId).elements}
                  row={items.find((row) => row.id == activeId)}
                  isRow={true}
                  className={`flex h-[90px] w-full gap-[5px] rounded-xl border border-[#F1EEE7] bg-[#F1EEE7] pr-[5px] shadow-lg`}
                >
                  <Container
                    parentIndex={items.findIndex((row) => row.id == activeId)}
                    onRemove={handleRemoveElement}
                    id={activeId}
                    items={items.find((row) => row.id == activeId).elements}
                    className={`flex h-full w-full shrink-0 items-center gap-x-[5px] `}
                    itemClassName={`relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-xl shadow-lg`}
                  />
                </SortableItem>
              </div>
            )}
          </DragOverlay>
        </SortableContext>
      </div>
    </DndContext>
  );
}
