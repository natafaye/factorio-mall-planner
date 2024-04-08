import { ReactNode, useEffect, useRef, useState } from "react";
import {
    DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor,
    MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors
} from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { Columns, moveAssembler, replaceColumns } from "../../redux/assemblerSlice";
import { useMultipleContainersCollisionDetection } from "../../utilities/useMultipleContainersCollisionDetection";
import { multipleContainersKeyboardCoordinateGetter } from "../../utilities/multipleContainersKeyboardCoordinates";
import { findColumnId } from "../../utilities/findColumnId";
import Assembler from "../AssemblerColumn/Assembler";
import DragHandle from "../AssemblerColumn/DragHandle";

export default function SortingContext({ children, data }: { children: ReactNode, data: Columns }) {
    const [clonedData, setClonedData] = useState<Columns | null>(null)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const activeItem = useAppSelector(state => activeId ? state.assemblers.assemblerList[activeId] : null)

    const lastOverId = useRef<UniqueIdentifier | null>(null)
    const recentlyMovedToNewContainer = useRef(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
    }, [data])

    const collisionDetection = useMultipleContainersCollisionDetection({
        activeId, data, lastOverId, recentlyMovedToNewContainer
    })

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: multipleContainersKeyboardCoordinateGetter })
    )

    const handleDragCancel = () => {
        if (clonedData) dispatch(replaceColumns(clonedData))
        setActiveId(null)
        setClonedData(null)
    };

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id)
        setClonedData(data)
    }

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        const overId = over?.id;

        if (overId == null) return

        const overColumnId = findColumnId(overId.toString(), data);
        const activeColumnId = findColumnId(active.id.toString(), data);

        if (!overColumnId || !activeColumnId || activeColumnId === overColumnId) return

        const overColumn = data[overColumnId]
        const overIndex = overColumn.indexOf(overId.toString());

        let newIndex: number

        if (overId in data) {
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
        const activeColumnId = findColumnId(active.id.toString(), data)

        if (!activeColumnId || overId == null) {
            setActiveId(null)
            return
        }

        const overColumnId = findColumnId(overId.toString(), data)

        if (!overColumnId) return

        const activeIndex = data[activeColumnId].indexOf(active.id.toString());
        const overIndex = data[overColumnId].indexOf(overId.toString());

        if (activeIndex === overIndex) return

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
            {children}
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