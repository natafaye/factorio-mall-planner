import { useDroppable } from "@dnd-kit/core"
import RecipeSelector from "../RecipeSelector/RecipeSelector"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { addAssembler } from "../../redux/assemblerSlice"
import { SortableContext, rectSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableAssembler from "./SortableAssembler"
import classNames from "classnames"

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