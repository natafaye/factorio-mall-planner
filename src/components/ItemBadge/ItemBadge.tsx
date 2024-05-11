import classNames from "classnames"
import ItemIcon from "../ItemIcon"
import { useAppDraggable } from "../../shared/sorting"
import { v4 as uuid } from "uuid"
import { useRef } from "react"

type Props = {
    name: string,
    amount?: number,
    satisfied?: boolean
    size?: "sm" | "md" | "lg"
}

export default function ItemBadge({ name, amount, satisfied, size = "md" }: Props) {
    const id = useRef(name + "+" + uuid())
    const { setNodeRef, attributes, listeners } = useAppDraggable({
        id: id.current,
        data: {
            type: "item"
        }
    })

    return (
        <div ref={setNodeRef} {...attributes} {...listeners}>
            <div className={classNames("bg-stone-900 text-white flex items-center justify-center",
                size === "lg" ? "p-3" : size === "md" ? "p-1" : "p-1",
                amount !== undefined && "ps-2",
                satisfied !== undefined ? "rounded-t-lg" : "rounded-lg"
            )}>
                {amount}
                <ItemIcon
                    key={name}
                    name={name}
                    size={size}
                    className={classNames(amount !== undefined && "ms-1")}
                />
            </div>
            {satisfied !== undefined &&
                <div className={classNames(
                    "h-2 rounded-b-lg",
                    satisfied ? "bg-green-900" : "bg-red-900"
                )} />
            }
        </div>
    )
}