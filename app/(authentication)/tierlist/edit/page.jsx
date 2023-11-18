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

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export default function TierList() {
  const [items, setItems] = useState(data);
  const [activeId, setActiveId] = useState(null);

  const handleRemoveRow = (id) =>
    setItems((rows) => rows.filter((row) => row.id !== id));
  const handleRemoveElement = (id, parentIndex) => {
    // const parentIndex = items.findIndex(row => row.id == parentID)
    console.log(parentIndex);
    console.log('id', id);
    // console.log('new', items[parentIndex].elements.filter(element => element.id !== id))
    setItems((prev) => {
      return [
        ...prev.slice(0, parentIndex),
        {
          id: prev[parentIndex].id,
          name: prev[parentIndex].name,
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

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    if (
      typeof overContainer === 'string' &&
      typeof activeContainer === 'object'
    ) {
      const activeContainerIndex = items.findIndex(
        (row) => row.id == activeContainer.id
      );
      const activeElementIndex = event.active.data.current.sortable.index;

      const overContainerIndex = event.over.data.current.sortable.index;

      if (items[overContainerIndex].elements.length == 0) {
        console.log('---');
        console.log('event', event);
        // console.log("activeContainer", activeContainer);
        console.log('activeContainerIndex', activeContainerIndex);
        console.log('activeElementIndex', activeElementIndex);

        console.log('overContainerIndex', overContainerIndex);
        setItems((prev) => {
          const add = {
            id: prev[overContainerIndex].id,
            name: prev[overContainerIndex].name,
            elements: [prev[activeContainerIndex].elements[activeElementIndex]],
          };

          const remove = {
            id: prev[activeContainerIndex].id,
            name: prev[activeContainerIndex].name,
            elements: prev[activeContainerIndex].elements.filter(
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

      return;
    }

    // swap row
    if (typeof activeContainer === 'string') {
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

    // swap elements between difference row
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

    // console.log('---')
    // console.log("event", event);
    // console.log('over', event.over);
    // console.log('overContainerIndex', overContainerIndex);

    if (
      !items[overContainerIndex] ||
      !items[overContainerIndex].elements ||
      !items[overContainerIndex].name ||
      (activeIndex != 0 && !activeIndex) ||
      (overIndex != 0 && !overIndex) ||
      !overId
    ) {
      return;
    }
    // console.log('---')
    // console.log("event", event);
    // console.log('over', event.over);

    setItems((prev) => {
      const add = prev[activeContainerIndex].elements[activeIndex];
      if (overContainerIndex < activeContainerIndex) {
        return [
          ...prev.slice(0, overContainerIndex),
          {
            id: prev[overContainerIndex].id,
            name: prev[overContainerIndex].name,
            elements: [
              ...prev[overContainerIndex].elements.slice(0, overIndex),
              add,
              ...prev[overContainerIndex].elements.slice(
                overIndex,
                prev[overContainerIndex].elements.length
              ),
              // {
              //   id: `empty${overContainerIndex + 1}`,
              //   isDisable: true,
              //   title: "",
              //   description: "This is the third item.",
              // },
            ],
          },
          ...prev.slice(overContainerIndex + 1, activeContainerIndex),
          {
            id: prev[activeContainerIndex].id,
            name: prev[activeContainerIndex].name,
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
            id: prev[activeContainerIndex].id,
            name: prev[activeContainerIndex].name,
            elements: [
              ...prev[activeContainerIndex].elements.filter(
                (element) => element.id !== active.id
              ),
            ],
          },
          ...prev.slice(activeContainerIndex + 1, overContainerIndex),
          {
            id: prev[overContainerIndex].id,
            name: prev[overContainerIndex].name,
            elements: [
              ...prev[overContainerIndex].elements.slice(0, overIndex),
              add,
              ...prev[overContainerIndex].elements.slice(
                overIndex,
                prev[overContainerIndex].elements.length
              ),
              // {
              //   id: `empty${overContainerIndex + 1}`,
              //   isDisable: true,
              //   title: "",
              //   description: "This is the third item.",
              // },
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
        id: prev[containerIndex].id,
        name: prev[containerIndex].name,
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

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
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
      // activationConstraint={{
      //   distance: 100,
      // }}
    >
      <div className='flex w-full flex-col gap-8 bg-green-400 '>
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
          {items.map((row, index) => {
            return (
              <SortableItem
                // onRemove={handleRemoveRow}
                id={row.id}
                index={index}
                key={row.id}
                isDisable={row.isDisable}
                items={row.elements}
                isRow={true}
                className={`flex min-h-[100px] w-full gap-4 rounded-xl border-4 border-black bg-purple-400 `}
                // itemClassName="flex bg-red-200 rounded-md min-w-[70px] min-h-[70px]"
              >
                <Container
                  parentIndex={index}
                  key={row.id}
                  onRemove={handleRemoveElement}
                  id={row.id}
                  items={row.elements}
                  className={`flex h-full w-full shrink-0 items-center gap-x-1.5 border-4`}
                  itemClassName={`border-4 border-red-800 relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)]`}
                />
              </SortableItem>
            );
          })}
          <DragOverlay dropAnimation={null}>
            {activeId ? (
              <SortableItem
                id={activeId}
                item={{ title: 'overlay' }}
                className='min-w-[70px] rounded-md bg-red-200'
              >
                <div>overlay {activeId}</div>
              </SortableItem>
            ) : null}
          </DragOverlay>
        </SortableContext>
      </div>
    </DndContext>
  );
}
