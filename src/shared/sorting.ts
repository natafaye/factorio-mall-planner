import { UseDraggableArguments, UseDroppableArguments, useDraggable, useDroppable } from "@dnd-kit/core";
import { UseSortableArguments, useSortable } from "@dnd-kit/sortable";

export type DraggableType = "item" | "assembler"

export type DraggableData = {
    type: DraggableType
}

export type DroppableData = {
    type: "supply" | "assembler"
    supports: DraggableType[]
}

export type SortableData = DraggableData & DroppableData


export const useAppDraggable = (args: UseDraggableArguments & { data: DraggableData }) => useDraggable(args)

export const useAppDroppable = (args: UseDroppableArguments & { data: DroppableData }) => useDroppable(args)

export const useAppSortable = (args: UseSortableArguments & { data: SortableData }) => useSortable(args)