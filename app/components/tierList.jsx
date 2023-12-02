import { useState } from 'react';
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
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import TierListRow from '@/app/components/tierListRow';
import DragOverLayTierList from '@/app/components/dragOverLayTierList';
import Spawner from '@/app/components/spawner';
import { Button } from './button';
import {
  handleDragOver,
  handleDragEnd,
  handleDragStart,
  handleAddRow,
  handleRemoveElement,
} from '@/utils/tierList/handler';

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export default function TierList({
  items,
  setItems,
  isEditable = false,
  className = '',
  tierListId,
  originalLength = 0,
}) {
  const [activeId, setActiveId] = useState(null); // for over lay
  const itemsLength = items.length;

  // sensor
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

  return (
    <DndContext
      id={tierListId}
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
      modifiers={[restrictToWindowEdges]}
      autoScroll={true}
      sensors={sensors}
    >
      <div className={className}>
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
          {/* each row of tier list part */}
          {items.map((row, index) => {
            // spawner part
            if (row.id == -1) {
              return (
                <Spawner
                  setItems={setItems}
                  isEditable={isEditable}
                  key={row.id}
                  items={items}
                  handleRemoveElement={(id, parentIndex) => {
                    handleRemoveElement(id, parentIndex, setItems);
                  }}
                />
              );
            }
            // each row in tier list
            return (
              <TierListRow
                tierListId={tierListId}
                lastIndexOriginal={originalLength - 2}
                itemsLength={itemsLength}
                isEditable={isEditable}
                key={row.id}
                row={row}
                rowIndex={index}
                handleRemoveElement={(id, parentIndex) => {
                  handleRemoveElement(id, parentIndex, setItems);
                }}
              />
            );
          })}
          <div
            className={`flex w-full items-center justify-center ${
              (!isEditable || items.length >= 9) && 'invisible'
            }`}
          >
            <div className='w-[200px]'>
              <Button
                onClick={() => {
                  handleAddRow(items, setItems);
                }}
                type={'addtextbtn'}
                text={'Add new Level'}
              />
            </div>
          </div>

          {/* drag overlay part */}
          <DragOverLayTierList items={items} activeId={activeId} />
        </SortableContext>
      </div>
    </DndContext>
  );
}
