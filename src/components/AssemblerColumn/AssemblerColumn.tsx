import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import {
    useAppDispatch, addAssembler,
    removeColumn,
    useSelectAssemblersInColumn,
    useSelectColumnById
} from "../../redux"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { SortableAssemblerCard } from "../AssemblerCard"
import { Button } from "../UI"
import ItemIcon from "../ItemIcon"
import ItemBadge from "../ItemBadge"
import EntitySelector from "../EntitySelector"
import { useAppDroppable } from "../../shared/sorting"

type Props = {
    columnId: string
    className?: string
}

export default function AssemblerColumn({ columnId, className = "" }: Props) {
    const assemblerIdsInColumn = useSelectColumnById(columnId)
    const assemblersInColumn = useSelectAssemblersInColumn(columnId)

    // Get a list of all ingredients needed and filter for unique unsatisfied ones
    const missingIngredients = assemblersInColumn.flatMap(a => a.recipe?.ingredients)
        .filter((a, index, list) => a && !a.satisfied && list.findIndex(b => b?.name === a.name) === index)

    const dispatch = useAppDispatch()

    const { isOver, setNodeRef } = useAppDroppable({
        id: columnId,
        data: {
            type: "assembler",
            supports: ["assembler", "item"]
        }
    })

    return (
        <SortableContext items={assemblerIdsInColumn} strategy={verticalListSortingStrategy}>
            <div
                ref={setNodeRef}
                className={classNames(
                    className,
                    isOver ? "border-stone-500" : "border-stone-700",
                    "rounded-md border w-56 flex-shrink-0 flex flex-col justify-stretch items-center"
                )}
            >
                <div className="flex gap-2 mt-2">
                    <EntitySelector
                        entityType="recipe"
                        onChange={
                            (recipeName) => dispatch(addAssembler({ recipeName, columnId }))
                        }
                    >
                        <span className="inline-flex items-center gap-2">
                            <FontAwesomeIcon icon={faPlus} />
                            <ItemIcon name="assembling-machine-1" />
                        </span>
                    </EntitySelector>
                    <Button

                        title="Delete Column"
                        onClick={() => dispatch(removeColumn(columnId))}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
                {missingIngredients.length > 0 &&
                    <div className="flex flex-wrap gap-2 mt-3 bg-red-900 p-3 w-full justify-center">
                        {missingIngredients.map(i => i && (
                            <ItemBadge key={i.name} name={i.name} />
                        ))}
                    </div>
                }
                <div className="overflow-auto flex-grow w-full">
                    {assemblersInColumn.map(assembler => (
                        <SortableAssemblerCard key={assembler.id} assembler={assembler} />
                    ))}
                </div>
            </div>
        </SortableContext>
    )
}