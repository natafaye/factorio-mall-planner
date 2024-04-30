import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import AssemblerCard from "./AssemblerCard"
import DragHandle from "../DragHandle"
import type { Assembler } from "../../types"

export default function SortableAssemblerCard({ assembler }: { assembler: Assembler }) {
    const { 
        attributes, listeners, isDragging, transform, transition,
        setNodeRef, setActivatorNodeRef, 
    } = useSortable({
        id: assembler.id,
        data: {
            columnId: assembler.columnId
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