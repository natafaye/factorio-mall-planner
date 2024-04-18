import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { addSupply, removeSupply } from "../../redux/supplySlice"
import ItemIcon from "../ItemIcon"
import RecipeSelector from "../RecipeSelector/RecipeSelector"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

export default function SupplyColumn({ index }: { index: number }) {
    const beltsInColumn = useAppSelector(state => state.supplyLines.lines[index])

    const dispatch = useAppDispatch()

    return (
        <div className="border border-1 rounded-md border-stone-700">
            <RecipeSelector onChange={(name) => dispatch(addSupply({ name, index }))}>+ Supply</RecipeSelector>
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