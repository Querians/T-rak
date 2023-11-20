import { useState, useEffect } from 'react';
import {
  DndContext,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import TierListRow from '@/app/components/tierListRow';
import DragOverLayTierList from '@/app/components/dragOverLayTierList';
import Spawner from '@/app/components/spawner';

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export default function TierList({ items, setItems, isEditable }) {
  const [activeId, setActiveId] = useState(null); // for over lay

  const handleRemoveElement = (id, parentIndex) => {
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
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
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
    if (
      typeof activeContainer === 'string' &&
      (overContainer == 'spawner' || overContainer?.id == 'spawner')
    ) {
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

    setItems((prev) => [
      ...prev.slice(0, containerIndex),
      {
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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100, // millisec
    },
  }); // Initialize mouse sensor

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100, // millisec
    },
  }); // Initialize touch sensor
  const sensors = useSensors(touchSensor, mouseSensor);

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
      <div className='mt-3.5 flex h-full w-full flex-col gap-y-2 rounded-tl-[20px] rounded-tr-[20px] bg-cream px-4 pt-[27px]'>
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
          {/* each row of tier list part */}
          {items.map((row, index) => {
            // spawner part
            if (index == items.length - 1) {
              return (
                isEditable && (
                  <Spawner
                    key={row.id}
                    items={items}
                    handleRemoveElement={handleRemoveElement}
                  />
                )
              );
            }

            // each row in tier list
            return (
              <TierListRow
                isEditable={isEditable}
                key={row.id}
                row={row}
                rowIndex={index}
                handleRemoveElement={handleRemoveElement}
              />
            );
          })}

          {/* drag overlay part */}
          <DragOverLayTierList items={items} activeId={activeId} />
        </SortableContext>
      </div>
    </DndContext>
  );
}
