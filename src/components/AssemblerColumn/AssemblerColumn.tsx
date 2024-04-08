import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { addAssembler } from "../../redux/assemblerSlice"
import RecipeSelector from "../RecipeSelector/RecipeSelector"
import SortableAssembler from "./SortableAssembler"

type AssemblerColumnProps = {
    columnId: string
    className?: string
}

export default function AssemblerColumn({ columnId, className = "" }: AssemblerColumnProps) {
    const assemblerIdsInColumn = useAppSelector(state => state.assemblers.columns[columnId])
    const assemblersInColumn = useAppSelector(state => state.assemblers.columns[columnId]
        .map(id => state.assemblers.assemblerList[id])
    )

    const dispatch = useAppDispatch()

    const { isOver, setNodeRef } = useDroppable({
        id: columnId,
        data: {
            columnId: columnId
        }
    })

    return (
        <SortableContext items={assemblerIdsInColumn} strategy={rectSortingStrategy}>
            <div
                ref={setNodeRef}
                className={classNames(
                    className, 
                    isOver ? "border-stone-500" : "border-stone-700", 
                    "rounded-md border"
                )}
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