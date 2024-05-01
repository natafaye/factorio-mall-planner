import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { addSupply, makeSelectSupplyLineByIndex, removeSupply, useAppDispatch } from "../../redux"
import ItemIcon from "../ItemIcon"
import RecipeSelector from "../RecipeSelector"
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function SupplyColumn({ index }: { index: number }) {
    const beltsInColumn = useSelector(makeSelectSupplyLineByIndex(index))

    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col items-center border border-1 rounded-md border-stone-700 pt-2 min-w-32">
            <RecipeSelector 
                onChange={(name) => dispatch(addSupply({ name, index }))}
            >
                <span className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faPlus}/>
                    <ItemIcon name="transport-belt"/>
                </span>
            </RecipeSelector>
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