import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { v4 as uuid } from "uuid"
import { useRef } from "react"
import ItemIcon from "../../ItemIcon"
import { removeSupply, useAppDispatch } from "../../../redux"
import { useAppDraggable } from "../../../shared/sorting"

type Props = {
    item: string,
    index: [number, number, number]
}

export default function FullBeltSpot({ item, index }: Props) {
    const dispatch = useAppDispatch()

    const id = useRef(item + "+" + uuid())
    const { setNodeRef, attributes, listeners } = useAppDraggable({
        id: id.current,
        disabled: !item,
        data: {
            type: "item",
            location: index,
        },
    })

    return (
        <div
            className="h-20"
        >
            <div className="bg-stone-900 p-2 rounded-lg flex flex-col items-center">
                <button
                    onClick={() => dispatch(removeSupply({ index }))}
                    className="text-stone-500 font-bold hover:text-stone-400 mb-1 py-0"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                >
                    <ItemIcon name={item} size="sm" />
                </div>
            </div>
        </div>
    )
}