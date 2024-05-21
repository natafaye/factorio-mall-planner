import { CSS } from "@dnd-kit/utilities"
import { AssemblerCard } from "./AssemblerCard"
import DragHandle from "../DragHandle"
import type { AssemblerFullData } from "../../shared/types"
import { useAppSortable } from "../../shared/sorting"

export function SortableAssemblerCard({ assembler }: { assembler: AssemblerFullData }) {
    const { 
        attributes, listeners, isDragging, transform, transition,
        setNodeRef, setActivatorNodeRef, 
    } = useAppSortable({
        id: assembler.id,
        data: {
            type: "assembler",
            supports: ["assembler", "item"]
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <AssemblerCard 
            style={style} 
            ref={setNodeRef} 
            className={isDragging ? "opacity-25" : ""} 
            assembler={assembler}
        >
            <DragHandle 
                ref={setActivatorNodeRef}
                {...listeners}
                {...attributes}
            />
        </AssemblerCard>
    )
}