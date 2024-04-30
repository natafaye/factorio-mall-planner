import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { useSelector } from "react-redux"
import classNames from "classnames"
import { 
    useAppDispatch, addAssembler, 
    makeSelectAssemblersInColumn, makeSelectColumnById 
} from "../../redux"
import RecipeSelector from "../RecipeSelector"
import SortableAssemblerCard from "./SortableAssemblerCard"

type AssemblerColumnProps = {
    columnId: string
    className?: string
}

export default function AssemblerColumn({ columnId, className = "" }: AssemblerColumnProps) {
    const assemblerIdsInColumn = useSelector(makeSelectColumnById(columnId))
    const assemblersInColumn = useSelector(makeSelectAssemblersInColumn(columnId))

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
                    <SortableAssemblerCard key={assembler.id} assembler={assembler} />
                ))}
            </div>
        </SortableContext>
    )
}