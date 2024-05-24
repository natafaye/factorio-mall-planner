import { ReactNode, useEffect, useRef, useState } from "react";
import {
    DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor,
    MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors
} from "@dnd-kit/core";
import {
    useAppDispatch, useSelectAssemblerById, moveAssembler, replaceAllColumns,
    addSupply,
    addAssembler,
    useSelectAllRecipes,
    swapSupply
} from "../../redux";
import { AssemblerCard } from "../AssemblerCard";
import DragHandle from "../DragHandle";
import ItemBadge from "../ItemBadge";
import { useMultipleContainersCollisionDetection } from "./useMultipleContainersCollisionDetection";
import { multipleContainersKeyboardCoordinateGetter } from "./multipleContainersKeyboardCoordinates";
import { findColumnId } from "./findColumnId";
import { ColumnsToAssemblers } from "../../shared/types";
import { DraggableData, DraggableType, DroppableData } from "../../shared/sorting";

export const NEW_PREFIX = "NEW"

const parseActiveItemId = (id: UniqueIdentifier) => {
    return id.toString().split("+")[0]
}

const parseSupplyId = (id: string): [number, number, number] => {
    const index = id.split("-")
    return [parseInt(index[0]), parseInt(index[1]), parseInt(index[2])]
}

export default function SortingContext({ children, data }: { children: ReactNode, data: ColumnsToAssemblers }) {
    // State
    const [clonedData, setClonedData] = useState<ColumnsToAssemblers | null>(null)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const [activeType, setActiveType] = useState<DraggableType | null>(null)

    // Redux
    const activeAssemblerItem = useSelectAssemblerById(activeId?.toString())
    const recipeList = useSelectAllRecipes()
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
        setActiveType(null)
        setClonedData(null)
    };

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id)
        setActiveType((active.data.current as DraggableData).type)
        setClonedData(data)
    }

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        if (over === null || over === undefined || activeId === null) return

        const activeData = active.data.current as DraggableData
        const overData = over.data.current as DroppableData

        if (!overData.supports.includes(activeData.type)) return

        const overId = over.id.toString()

        if (activeData.type === "item") return

        const overColumnId = findColumnId(overId, data);
        const activeColumnId = findColumnId(active.id.toString(), data);

        if (!overColumnId || !activeColumnId || activeColumnId === overColumnId) return

        const overColumn = data[overColumnId]
        const overIndex = overColumn.indexOf(overId);

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
        if (over === null || over === undefined || activeId === null) return

        const activeData = active.data.current as DraggableData
        const overData = over.data.current as DroppableData

        if (!overData.supports.includes(activeData.type)) return

        const overId = over.id.toString()

        if (activeData.type === "item" && (
                overData.type === "supply" || (overData.type === "belt-spot" && !activeData.location)
            )
        ) {
            if(!overData.location) return
            dispatch(addSupply({ name: parseActiveItemId(activeId), index: overData.location }))
            setActiveId(null)
            setActiveType(null)
            return
        }

        if(activeData.type === "item" && overData.type === "belt-spot" && activeData.location) {
            if(!overData.location) return
            dispatch(swapSupply({ 
                startIndex: activeData.location, 
                endIndex: overData.location 
            }))
            setActiveId(null)
            setActiveType(null)
            return
        }

        if (activeData.type === "item" && overData.type === "assembler") {
            const recipeName = parseActiveItemId(activeId)
            if (!recipeList.some(r => r.name === recipeName)) return

            // will be undefined if dropped on new column button
            const columnId = findColumnId(overId, data)

            dispatch(addAssembler({ recipeName, columnId }))
            setActiveId(null)
            setActiveType(null)
            return
        }

        const activeColumnId = findColumnId(active.id.toString(), data)

        if (!activeColumnId) {
            setActiveId(null)
            setActiveType(null)
            return
        }

        if (overId.startsWith(NEW_PREFIX)) {
            dispatch(moveAssembler({
                oldColumnId: activeColumnId,
                assemblerId: active.id.toString(),
                newIndex: 0
            }))
            setActiveId(null)
            setActiveType(null)
            return
        }

        const overColumnId = findColumnId(overId, data)

        if (!overColumnId) return

        const activeIndex = data[activeColumnId].indexOf(active.id.toString());
        const overIndex = data[overColumnId].indexOf(overId);

        if (activeIndex === overIndex) return

        dispatch(moveAssembler({
            newColumnId: overColumnId,
            oldColumnId: activeColumnId,
            assemblerId: active.id.toString(),
            newIndex: overIndex,
        }))

        setActiveId(null)
        setActiveType(null)
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
            <DragOverlay className="w-64" dropAnimation={null}>
                {activeType === "assembler" && activeAssemblerItem ? (
                    <AssemblerCard
                        key={activeAssemblerItem!.id}
                        size="sm"
                        assembler={activeAssemblerItem}
                    >
                        <DragHandle />
                    </AssemblerCard>
                ) : activeType === "item" && activeId ? (
                    <ItemBadge key={activeId} name={parseActiveItemId(activeId!)} />
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}