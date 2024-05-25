import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { addSupply, useAppDispatch } from "../../../redux"
import EntitySelector from "../../EntitySelector"
import { useRef } from "react"
import { v4 as uuid } from "uuid"
import { useAppDroppable } from "../../../shared/sorting"

type Props = {
    index: [number, number, number]
}

export default function EmptyBeltSpot({ index }: Props) {
    const dispatch = useAppDispatch()

    const id = useRef(uuid())
    const { setNodeRef, isOver } = useAppDroppable({
        id: id.current,
        data: {
            type: "belt-spot",
            supports: ["item"],
            location: index,
        }
    })

    return (
        <div className="h-20" ref={setNodeRef}>
            <EntitySelector
                entityType="item"
                onSelectChange={(name) => dispatch(addSupply({ name, index }))}
                as="button"
                className={classNames(
                    "rounded text-center w-full hover:bg-stone-500 transition-all",
                    isOver ? "bg-stone-500 py-5" : "bg-stone-600 py-4"
                )}
            >
                <FontAwesomeIcon icon={faPlus} />
            </EntitySelector>
        </div>
    )
}