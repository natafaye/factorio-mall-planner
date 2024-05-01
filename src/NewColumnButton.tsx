import { useDroppable } from "@dnd-kit/core";
import { Button } from "./components/UI";
import classNames from "classnames";
import { NEW_PREFIX } from "./components/SortingContext/SortingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addColumn, useAppDispatch } from "./redux";

export default function NewColumnButton() {
    const { setNodeRef, isOver } = useDroppable({
        id: NEW_PREFIX
    })

    const dispatch = useAppDispatch()

    return (
        <div
            ref={setNodeRef}
            className={classNames(
                "self-top border rounded-md", 
                isOver ? "border-stone-500" : "border-stone-800"
            )}
        >
            <Button title="Create New Column" onClick={() => dispatch(addColumn())}>
                <FontAwesomeIcon icon={faPlus}/>
            </Button>
        </div>
    )
}