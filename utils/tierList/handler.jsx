import { arrayMove } from '@dnd-kit/sortable';
import Swal from 'sweetalert2';

function findContainer(id, items) {
  if (items.find((container) => container.id == id)) {
    return id;
  }

  return items.find((row) => row.elements.find((element) => element.id == id));
}

export function handleDragStart(event, setActiveId) {
  setActiveId(event.active.id);
}

export function handleDragOver(event, setItems, items) {
  const { active, over } = event;
  const { id } = active;
  const overId = over?.id;

  // Find the containers
  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);
  const isSpawner = event.over?.id == -1;

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  // drag element to empty row
  if (
    (typeof overContainer === 'string' || overContainer == -1) &&
    typeof activeContainer === 'object'
  ) {
    if (activeContainer.id == -1 && Math.abs(event.delta.y) < 40) {
      return;
    }
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
            elements: [prev[activeContainerIndex].elements[activeElementIndex]],
          },
        ];
      });
      return;
    }
    if (!isSpawner && event.over.data.current?.sortable) {
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
    (overContainer == -1 || overContainer?.id == -1)
  ) {
    return;
  }
  if (
    typeof activeContainer === 'string' &&
    !(overContainer == -1 || overContainer?.id == -1)
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
      container.elements?.filter((element) => element.id == overId).length == 1
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

export function handleDragEnd(event, setItems, items, setActiveId) {
  const { active, over } = event;
  const { id } = active;
  const overId = over?.id;

  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);

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

export const handleAddRow = (items, setItems) => {
  const defaultRow = [
    {
      label: 'All of my heart',
      bgColor: 'fafeff',
    },
    {
      label: 'Part of my heart',
      bgColor: 'fad4be',
    },
    {
      label: 'In my heart',
      bgColor: 'fae6be',
    },
    {
      label: 'Love that',
      bgColor: 'f2fabe',
    },
    {
      label: 'Ahh Ha',
      bgColor: 'd8fabe',
    },
    {
      label: 'Ummm',
      bgColor: 'befae4',
    },
    {
      label: "What that's",
      bgColor: 'beecfa',
    },
    {
      label: 'Nope',
      bgColor: 'bed2fa',
    },
  ];
  setItems((prev) => {
    const id = window.crypto.randomUUID({ disableEntropyCache: true });
    return [
      ...items.slice(0, -1),
      {
        rowId: id,
        id: id,
        label: defaultRow[items.length - 1].label,
        color: defaultRow[items.length - 1].bgColor,
        deletedElements: [],
        elements: [],
      },
      items[items.length - 1],
    ];
  });
};

const removeElement = (id, parentIndex, setItems) => {
  setItems((prev) => {
    return [
      ...prev.slice(0, parentIndex),
      {
        ...prev[parentIndex],
        deletedElements: [...prev[parentIndex].deletedElements, id],
        elements: prev[parentIndex].elements.filter(
          (element) => element.id !== id
        ),
      },
      ...prev.slice(parentIndex + 1, prev.length),
    ];
  });
};

export const handleRemoveElement = (id, parentIndex, setItems) => {
  Swal.fire({
    title: 'Are you sure?',
    color: '#A73440',
    text: 'Do you really want to delete this Image?',
    iconHtml:
      '<Image src="/iconTrash.svg" width=65px height=65px alt="delete icon" />',
    showCancelButton: true,
    confirmButtonColor: '#a73440',
    cancelButtonColor: '#DE717C',
    confirmButtonText: 'Delete',
    buttonsStyling: false,
    customClass: {
      popup: 'flex flex-col gap-[15px] bg-peach border border-cream rounded-lg',
      title: 'p-0',
      htmlContainer: 'm-0',
      icon: 'border-0',
      actions: 'flex flex-col gap-[15px] w-1/2',
      confirmButton:
        'bg-winered py-2 text-white font-bold w-full rounded-lg shadow-lg border border-[#FAFEFF]',
      cancelButton:
        'bg-cherry py-2 text-white font-bold w-full rounded-lg shadow-lg border border-[#FAFEFF]',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      removeElement(id, parentIndex, setItems);
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: 'success',
        title: 'Delete successfully',
      });
    }
  });
};
