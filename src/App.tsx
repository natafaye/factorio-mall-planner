import RecipeSelector from "./RecipeSelector";
import ItemImage from "./ItemIcon";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import AssemblerColumn from "./AssemblerColumn";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { addSupply } from "./supplySlice";
import { moveAssembler } from "./assemblerSlice";
import Assembler from "./Assembler";
import { useState } from "react";
import DragHandle from "./DragHandle";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function App() {
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const assemblerColumnList = useAppSelector(state => state.assemblers.columnList)
  const supplyList = useAppSelector(state => state.supplyLines.supplyList)
  const draggingItem = useAppSelector(state => state.assemblers.assemblerList.find(a => a.id === draggingId))

  const dispatch = useAppDispatch()

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingId(event.active.id.toString())
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if(!over) return

    if (active.id !== over.id) {
      
      dispatch(moveAssembler({
        assemblerId: active.id.toString(),
        newColumnId: over.data.current?.columnId,
        droppedOnOrder: over.data.current?.order
      }))
    }
    setDraggingId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
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
                  <ItemImage name={item} />
                ))}
              </div>
            </div>
            {assemblerColumnList.map(columnId => (
              <AssemblerColumn key={columnId} columnId={columnId} />
            ))}
          </div>
        </div>
        <DragOverlay className="w-64" dropAnimation={{ duration: 250, easing: "ease" }}>
          {!draggingItem ? null : (
            <Assembler assembler={draggingItem}>
              <DragHandle />
            </Assembler>
          )}
        </DragOverlay>
    </DndContext>
  )
}
