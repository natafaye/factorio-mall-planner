import { CSSProperties, ReactNode, forwardRef } from "react"
import { useSelector } from "react-redux"
import { 
    useAppDispatch, removeAssembler, 
    makeSelectRecipeByName, makeSelectAdjacentSupplyLines 
} from "../../redux"
import ItemIcon from "../ItemIcon"
import type { Assembler } from "../../types"

type AssemblerProps = {
    assembler: Assembler
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

const AssemblerCard = forwardRef<HTMLDivElement, AssemblerProps>(
    ({ assembler, children, className = "", style = {} }, ref) => {
        const recipe = useSelector(makeSelectRecipeByName(assembler.recipeName))
        const supplyList = useSelector(makeSelectAdjacentSupplyLines(assembler.columnId))

        const dispatch = useAppDispatch()

        return (
            <div 
                ref={ref} 
                style={style} 
                className={`${className} bg-stone-700 w-56 m-3 p-1 rounded-2xl flex flex-col items-center`}
            >
                <div className="flex items-center w-full mb-3">
                    <div className="flex-grow">
                        {children}
                    </div>
                    <button
                        onClick={() => dispatch(removeAssembler(assembler))}
                        className="text-stone-500 font-bold hover:bg-stone-600 hover:text-stone-400 -ms-7 p-2 py-1 rounded-md"
                    >
                        &#x2715;
                    </button>
                </div>
                <ItemIcon name={assembler.recipeName} />
                <div className="flex flex-wrap gap-2 m-3">
                    {recipe?.ingredients.map(i => (
                        <div key={i.name}>
                            <div className="bg-stone-900 p-1 ps-2 text-white rounded-t-lg flex items-center">
                                {i.amount}
                                <ItemIcon key={i.name} name={i.name} className="ms-1" />
                            </div>
                            <div className={`h-2 rounded-b-lg ${supplyList.includes(i.name) ? "bg-green-900" : "bg-red-900"
                                }`} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
)

export default AssemblerCard