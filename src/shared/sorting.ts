import { UseDraggableArguments, UseDroppableArguments, useDraggable, useDroppable } from "@dnd-kit/core";
import { UseSortableArguments, useSortable } from "@dnd-kit/sortable";

export type DraggableType = "item" | "assembler"

export type DraggableData = {
    type: DraggableType
    location?: [number, number, number]
}

export type DroppableData = {
    type: "belt-spot" | "supply" | "assembler"
    supports: DraggableType[]
    location?: [number, number, number]
}

export type SortableData = DraggableData & DroppableData


export const useAppDraggable = (args: UseDraggableArguments & { data: DraggableData }) => useDraggable(args)

export const useAppDroppable = (args: UseDroppableArguments & { data: DroppableData }) => useDroppable(args)

export const useAppSortable = (args: UseSortableArguments & { data: SortableData }) => useSortable(args)