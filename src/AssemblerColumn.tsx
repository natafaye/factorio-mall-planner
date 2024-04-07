import { useDroppable } from "@dnd-kit/core"
import RecipeSelector from "./RecipeSelector"
import { useAppDispatch, useAppSelector } from "./reduxHooks"
import { addAssembler } from "./assemblerSlice"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableAssembler from "./SortableAssembler"

type AssemblerColumnProps = {
    columnId: string
    className?: string
}

export default function AssemblerColumn({ columnId, className = "" }: AssemblerColumnProps) {
    const assemblersInColumn = useAppSelector(state => state.assemblers.assemblerList
        .filter(a => a.columnId === columnId)
        .sort((a, b) => a.order - b.order)
    )

    const dispatch = useAppDispatch()

    const { isOver, setNodeRef } = useDroppable({
        id: columnId,
        data: {
            columnId: columnId
        }
    })

    return (
        <SortableContext items={assemblersInColumn.map(a => a.id)} strategy={verticalListSortingStrategy}>
            <div
                ref={setNodeRef}
                className={`${className} rounded-md border ${isOver ? "border-stone-500" : "border-stone-700"
                    }`}
            >
                <RecipeSelector
                    onChange={(recipeName) => dispatch(addAssembler({ recipeName, columnId }))}
                >+ Assembling Machine</RecipeSelector>
                {assemblersInColumn.map(assembler => (
                    <SortableAssembler key={assembler.id} assembler={assembler} />
                ))}
            </div>
        </SortableContext>
    )
}