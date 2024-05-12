import { CSSProperties, ReactNode, forwardRef } from "react"
import { useAppDispatch, removeAssembler } from "../../redux"
import ItemBadge from "../ItemBadge"
import ItemIcon from "../ItemIcon"
import type { AssemblerFullData } from "../../redux/types"

type AssemblerProps = {
    assembler: AssemblerFullData
    children?: ReactNode
    className?: string
    style?: CSSProperties
    size?: "sm" | "md" | "lg"
}

export const AssemblerCard = forwardRef<HTMLDivElement, AssemblerProps>(
    ({ assembler, children, size = "md", className = "", style = {} }, ref) => {
        const dispatch = useAppDispatch()

        return (
            <div
                ref={ref}
                style={style}
                className={`${className} group relative bg-stone-700 m-3 p-1 rounded-2xl flex flex-col items-center`}
            >
                <div className="absolute w-full mb-3 hidden group-hover:flex">
                    <div className="flex-grow -mt-1">
                        {children}
                    </div>
                    <button
                        onClick={() => dispatch(removeAssembler(assembler))}
                        className="-ms-6 pt-1 pe-3 font-bold text-stone-500 hover:text-stone-400"
                    >
                        &#x2715;
                    </button>
                </div>
                <ItemIcon
                    name={assembler.recipeName}
                    size={size}
                    className="mt-5"
                />
                <div className="flex flex-wrap justify-center gap-2 m-3">
                    {assembler.recipe?.ingredients?.map((ingredient) => (
                        <ItemBadge
                            key={ingredient.name}
                            name={ingredient.name}
                            satisfied={ingredient.satisfied}
                            size={size}
                        />
                    ))}
                </div>
            </div>
        )
    }
)