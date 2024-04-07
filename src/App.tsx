import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor,
  MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors
} from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";
import { addSupply } from "./redux/supplySlice";
import { Columns, moveAssembler, replaceColumns } from "./redux/assemblerSlice";
import Assembler from "./components/AssemblerColumn/Assembler";
import DragHandle from "./components/AssemblerColumn/DragHandle";
import AssemblerColumn from "./components/AssemblerColumn/AssemblerColumn";
import RecipeSelector from "./components/RecipeSelector/RecipeSelector";
import ItemImage from "./components/ItemIcon/ItemIcon";
import { useMultipleContainersCollisionDetection } from "./utilities/useMultipleContainersCollisionDetection";
import { multipleContainersKeyboardCoordinateGetter } from "./utilities/multipleContainersKeyboardCoordinates";
import { findColumnId } from "./utilities/sortingUtilities";

export default function App() {
  const supplyList = useAppSelector(state => state.supplyLines.supplyList)

  const dispatch = useAppDispatch()

  const columns = useAppSelector(state => state.assemblers.columns)
  const columnIds = useMemo(() => Object.keys(columns), [columns])
  const [clonedColumns, setClonedColumns] = useState<Columns | null>(null)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const activeItem = useAppSelector(state => activeId ? state.assemblers.assemblerList[activeId] : null)

  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [columns])

  const collisionDetection = useMultipleContainersCollisionDetection({
    activeId, items: columns, lastOverId, recentlyMovedToNewContainer
  })

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: multipleContainersKeyboardCoordinateGetter })
  )

  const handleDragCancel = () => {
    if (clonedColumns) dispatch(replaceColumns(clonedColumns))
    setActiveId(null)
    setClonedColumns(null)
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
    setClonedColumns(columns)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null) return

    const overColumnId = findColumnId(overId.toString(), columns);
    const activeColumnId = findColumnId(active.id.toString(), columns);

    if (!overColumnId || !activeColumnId || activeColumnId === overColumnId) return

    const overColumn = columns[overColumnId]
    const overIndex = overColumn.indexOf(overId.toString());

    let newIndex: number

    if (overId in columns) {
      // If it's dropped on a column, put it on the end
      newIndex = overColumn.length + 1
    } else {
      // Put it above or below the item, depending on the location
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top >
        over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newIndex = overIndex >= 0 ? overIndex + modifier : overColumn.length + 1;
    }

    recentlyMovedToNewContainer.current = true;

    dispatch(moveAssembler({
      newColumnId: overColumnId,
      oldColumnId: activeColumnId,
      assemblerId: active.id.toString(),
      newIndex,
    }))
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const overId = over?.id
    const activeColumnId = findColumnId(active.id.toString(), columns)

    if (!activeColumnId || overId == null) {
      setActiveId(null)
      return
    }

    const overColumnId = findColumnId(overId.toString(), columns)

    if(!overColumnId) return

    const activeIndex = columns[activeColumnId].indexOf(active.id.toString());
    const overIndex = columns[overColumnId].indexOf(overId.toString());

    if(activeIndex === overIndex) return

    dispatch(moveAssembler({
      newColumnId: overColumnId,
      oldColumnId: activeColumnId,
      assemblerId: active.id.toString(),
      newIndex: overIndex,
    }))

    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col min-h-screen">
        <div className="bg-stone-900">
        </div>
        <div className="flex flex-grow overflow-auto m-5 gap-5">
          <div className="border border-1 rounded-md border-stone-700">
            <RecipeSelector onChange={(name) => dispatch(addSupply(name))}>+ Supply</RecipeSelector>
            <div>
              {supplyList.map(item => (
                <ItemImage key={item} name={item} />
              ))}
            </div>
          </div>
          {columnIds.map(columnId => (
            <AssemblerColumn key={columnId} columnId={columnId} />
          ))}
        </div>
      </div>
      <DragOverlay className="w-64" dropAnimation={{ duration: 250, easing: "ease" }}>
        {!activeItem ? null : (
          <Assembler key={activeItem.id} assembler={activeItem}>
            <DragHandle />
          </Assembler>
        )}
      </DragOverlay>
    </DndContext>
  )
}
