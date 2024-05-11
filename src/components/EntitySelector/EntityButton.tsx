import classNames from "classnames"
import { BaseEntity } from "../../redux"
import ItemIcon from "../ItemIcon"
import { HTMLAttributes } from "react"

type Props<Type> = HTMLAttributes<HTMLButtonElement> & {
    entity: Type
    selected: boolean
}

export default function EntityButton<Type extends BaseEntity>({ 
    entity, selected, className, ...props
}: Props<Type>) {
    return (
        <button
            { ...props }
            className={classNames(
                className,
                "p-1 pb-0", 
                selected ? "bg-green-700 hover:bg-green-600" : "hover:bg-stone-600"
            )}
        >
            <ItemIcon key={entity.name} name={entity.name} />
        </button>
    )
}