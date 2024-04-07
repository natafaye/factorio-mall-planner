import Assembler from "./Assembler"
import DragHandle from "./DragHandle"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"

export default function SortableAssembler({ assembler }: { assembler: Assembler }) {
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging, transform, transition } = useSortable({
        id: assembler.id,
        data: {
            columnId: assembler.columnId,
            order: assembler.order
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <Assembler 
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
        </Assembler>
    )
}