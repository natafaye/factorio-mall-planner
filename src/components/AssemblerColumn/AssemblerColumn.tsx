import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import classNames from "classnames"
import {
    useAppDispatch, addAssembler,
    removeColumn,
    useSelectAssemblersInColumn,
    useSelectColumnById
} from "../../redux"
import RecipeSelector from "../RecipeSelector"
import SortableAssemblerCard from "./SortableAssemblerCard"
import { Button } from "../UI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import ItemIcon from "../ItemIcon"
import { useAppDroppable } from "../../shared/sorting"
import ItemBadge from "../ItemBadge/ItemBadge"

type AssemblerColumnProps = {
    columnId: string
    className?: string
}

export default function AssemblerColumn({ columnId, className = "" }: AssemblerColumnProps) {
    const assemblerIdsInColumn = useSelectColumnById(columnId)
    const assemblersInColumn = useSelectAssemblersInColumn(columnId)

    // Get a list of all ingredients needed and filter for unique unsatisfied ones
    const missingIngredients = assemblersInColumn.flatMap(a => a.recipe?.ingredients)
        .filter((a, index, list) => a && !a.satisfied && list.findIndex(b => b?.name === a.name) === index)

    const dispatch = useAppDispatch()

    const { isOver, setNodeRef } = useAppDroppable({
        id: columnId,
        data: {
            supports: ["assembler"]
        }
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
                { missingIngredients.length > 0 && 
                    <>
                        <div className="flex flex-wrap gap-2 mt-3 bg-red-900 p-3 w-full justify-center">
                            {missingIngredients.map(i => i && (
                                <ItemBadge key={i.name} name={i.name} />
                            ))}
                        </div>
                    </>
                }
                {assemblersInColumn.map(assembler => (
                    <SortableAssemblerCard key={assembler.id} assembler={assembler} />
                ))}
            </div>
        </SortableContext>
    )
}