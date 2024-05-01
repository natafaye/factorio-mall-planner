import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { useSelector } from "react-redux"
import classNames from "classnames"
import {
    useAppDispatch, addAssembler,
    makeSelectAssemblersInColumn, makeSelectColumnById,
    removeColumn
} from "../../redux"
import RecipeSelector from "../RecipeSelector"
import SortableAssemblerCard from "./SortableAssemblerCard"
import { Button } from "../UI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import ItemIcon from "../ItemIcon"

type AssemblerColumnProps = {
    columnId: string
    className?: string
}

export default function AssemblerColumn({ columnId, className = "" }: AssemblerColumnProps) {
    const assemblerIdsInColumn = useSelector(makeSelectColumnById(columnId))
    const assemblersInColumn = useSelector(makeSelectAssemblersInColumn(columnId))

    const dispatch = useAppDispatch()

    const { isOver, setNodeRef } = useDroppable({
        id: columnId
    })

    return (
        <SortableContext items={assemblerIdsInColumn} strategy={rectSortingStrategy}>
            <div
                ref={setNodeRef}
                className={classNames(
                    className,
                    isOver ? "border-stone-500" : "border-stone-700",
                    "rounded-md border basis-64 flex-shrink-0 flex flex-col items-center"
                )}
            >
                <div className="flex gap-2 mt-2">
                    <RecipeSelector
                        onChange={
                            (recipeName) => dispatch(addAssembler({ recipeName, columnId }))
                        }
                    >
                        <span className="inline-flex items-center gap-2">
                            <FontAwesomeIcon icon={faPlus} />
                            <ItemIcon name="assembling-machine-1" />
                        </span>
                    </RecipeSelector>
                    <Button

                        title="Delete Column"
                        onClick={() => dispatch(removeColumn(columnId))}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
                {assemblersInColumn.map(assembler => (
                    <SortableAssemblerCard key={assembler.id} assembler={assembler} />
                ))}
            </div>
        </SortableContext>
    )
}