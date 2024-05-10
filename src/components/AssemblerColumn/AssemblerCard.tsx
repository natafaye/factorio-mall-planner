import { CSSProperties, ReactNode, forwardRef } from "react"
import { useAppDispatch, removeAssembler } from "../../redux"
import IngredientBadge from "./IngredientBadge"
import ItemIcon from "../ItemIcon"
import type { AssemblerFullData } from "../../redux/types"

type AssemblerProps = {
    assembler: AssemblerFullData
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

const AssemblerCard = forwardRef<HTMLDivElement, AssemblerProps>(
    ({ assembler, children, className = "", style = {} }, ref) => {
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
                        className="text-stone-500 font-bold -ms-7 p-2 py-1 rounded-md 
                        hover:bg-stone-600 hover:text-stone-400"
                    >
                        &#x2715;
                    </button>
                </div>
                <ItemIcon name={assembler.recipeName} />
                <div className="flex flex-wrap gap-2 m-3">
                    {assembler.recipe?.ingredients?.map((ingredient) => (
                        <IngredientBadge
                            key={ingredient.name}
                            ingredient={ingredient}
                            isSatisfied={ingredient.satisfied}
                        />
                    ))}
                </div>
            </div>
        )
    }
)

export default AssemblerCard