import { ReactNode, useEffect, useRef, useState } from "react";
import {
    DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor,
    MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors
} from "@dnd-kit/core";
import { 
    useAppDispatch, useSelectAssemblerById, moveAssembler, replaceAllColumns 
} from "../../redux";
import { AssemblerCard } from "../AssemblerColumn";
import DragHandle from "../DragHandle/DragHandle";
import { useMultipleContainersCollisionDetection } from "./useMultipleContainersCollisionDetection";
import { multipleContainersKeyboardCoordinateGetter } from "./multipleContainersKeyboardCoordinates";
import { findColumnId } from "./findColumnId";
import { ColumnsToAssemblers } from "../../redux/types";

export const NEW_PREFIX = "NEW"

export default function SortingContext({ children, data }: { children: ReactNode, data: ColumnsToAssemblers }) {
    // State
    const [clonedData, setClonedData] = useState<ColumnsToAssemblers | null>(null)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    // Redux
    const activeItem = useSelectAssemblerById(activeId as string)
    const dispatch = useAppDispatch()

    // Refs
    const lastOverId = useRef<UniqueIdentifier | null>(null)
    const recentlyMovedToNewContainer = useRef(false)

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
        if (clonedData) dispatch(replaceAllColumns(clonedData))
        setActiveId(null)
        setClonedData(null)
    };

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id)
        setClonedData(data)
    }

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        const overId = over?.id;

        if (!overId) return

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

        if(overId.toString().startsWith(NEW_PREFIX)) {
            dispatch(moveAssembler({
                oldColumnId: activeColumnId,
                assemblerId: active.id.toString(),
                newIndex: 0
            }))
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
                    <AssemblerCard key={activeItem.id} assembler={activeItem}>
                        <DragHandle />
                    </AssemblerCard>
                )}
            </DragOverlay>
        </DndContext>
    )
}