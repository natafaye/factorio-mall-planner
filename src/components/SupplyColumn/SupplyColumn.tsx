import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addSupply, useSelectSupplyLineByIndex, removeSupply, useAppDispatch } from "../../redux"
import ItemIcon from "../ItemIcon"
import EntitySelector from "../EntitySelector"
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useAppDroppable } from "../../shared/sorting"
import classNames from "classnames"

export default function SupplyColumn({ index }: { index: number }) {
    const beltsInColumn = useSelectSupplyLineByIndex(index)

    const dispatch = useAppDispatch()

    const { setNodeRef, isOver } = useAppDroppable({
        id: index,
        data: {
            type: "supply",
            supports: ["item"]
        }
    })

    return (
        <div ref={setNodeRef} className={classNames(
            "flex flex-col items-center border border-1 rounded-md pt-2 min-w-32",
            isOver ? "border-stone-500" : "border-stone-700"
        )}>
            <EntitySelector
                type="item"
                onChange={(name) => dispatch(addSupply({ name, index }))}
            >
                <span className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faPlus}/>
                    <ItemIcon name="transport-belt"/>
                </span>
            </EntitySelector>
            <div className="flex gap-2 p-2">
                {beltsInColumn.map(item => (
                    <div key={item} className="bg-stone-600 flex flex-col items-center p-1">
                        <button
                            onClick={() => dispatch(removeSupply({ name: item, index }))}
                            className="text-stone-500 font-bold hover:bg-stone-500 hover:text-stone-400 mb-2 p-1 py-0 rounded-sm"
                        >
                            &#x2715;
                        </button>
                        <FontAwesomeIcon icon={faAngleDown} className="text-yellow-400" />
                        <ItemIcon name={item} />
                        <FontAwesomeIcon icon={faAngleDown} className="text-yellow-400" />
                        <ItemIcon name={item} />
                        <FontAwesomeIcon icon={faAngleDown} className="text-yellow-400" />
                    </div>
                ))}
            </div>
        </div>
    )
}