import { useEffect, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier,
  useSensors, useSensor, MeasuringStrategy, DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { coordinateGetter as multipleContainersCoordinateGetter } from '../utilities/multipleContainersKeyboardCoordinates';
import { Item, SortableItem } from './Item';
import { DroppableContainer } from './Container';
import { useMultipleContainersCollisionDetection } from '../utilities/useMultipleContainersCollisionDetection';
import { findContainer } from '../utilities/findColumnId';

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;
const PLACEHOLDER_ID = 'placeholder';
const empty: UniqueIdentifier[] = [];
const starterItems: Items = {
  A: [...new Array(3)].map((_,index) => `A${index}`),
  B: [...new Array(3)].map((_,index) => `B${index}`),
  C: [...new Array(3)].map((_,index) => `C${index}`),
}

export function MultipleContainers() {
  const [items, setItems] = useState(starterItems);
  const [containers, setContainers] = useState(Object.keys(items) as UniqueIdentifier[]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);

  useEffect(() => {
      requestAnimationFrame(() => {
          recentlyMovedToNewContainer.current = false;
      });
  }, [items]);
  
  const collisionDetection = useMultipleContainersCollisionDetection({ 
    activeId, items, lastOverId, recentlyMovedToNewContainer
  })

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: multipleContainersCoordinateGetter })
  );

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setClonedItems(items);
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null || active.id in items) {
      return;
    }

    const overContainer = findContainer(overId, items);
    const activeContainer = findContainer(active.id, items);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = items[activeContainer];
        const overItems = items[overContainer];
        const overIndex = overItems.indexOf(overId);
        const activeIndex = activeItems.indexOf(active.id);

        let newIndex: number;

        if (overId in items) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
            over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewContainer.current = true;

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (item) => item !== active.id
          ),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ],
        };
      });
    }
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in items && over?.id) {
      setContainers((containers) => {
        const activeIndex = containers.indexOf(active.id);
        const overIndex = containers.indexOf(over.id);

        return arrayMove(containers, activeIndex, overIndex);
      });
    }

    const activeContainer = findContainer(active.id, items);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveId(null);
      return;
    }

    if (overId === PLACEHOLDER_ID) {
      const newContainerId = String.fromCharCode(containers[containers.length - 1].toString().charCodeAt(0) + 1);

      unstable_batchedUpdates(() => {
        setContainers((containers) => [...containers, newContainerId]);
        setItems((items) => ({
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (id) => id !== activeId
          ),
          [newContainerId]: [active.id],
        }));
        setActiveId(null);
      });
      return;
    }

    const overContainer = findContainer(overId, items);

    if (overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id);
      const overIndex = items[overContainer].indexOf(overId);

      if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }

    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div style={{ display: 'inline-grid', gridAutoFlow: 'column' }} >
        {containers.map((containerId) => (
          <DroppableContainer
            key={containerId}
            id={containerId}
            label={`Column ${containerId}`}
            items={items[containerId]}
          >
            <SortableContext items={items[containerId]} strategy={verticalListSortingStrategy}>
              {items[containerId].map((value, index) => (
                <SortableItem key={value} id={value} index={index} />
              ))}
            </SortableContext>
          </DroppableContainer>
        ))}
        <DroppableContainer id={PLACEHOLDER_ID} items={empty} placeholder >
          + Add column
        </DroppableContainer>
      </div>
      <DragOverlay>
        {activeId ? <Item value={activeId} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
