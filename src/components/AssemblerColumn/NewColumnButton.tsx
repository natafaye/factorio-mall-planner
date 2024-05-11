import { Button } from "../UI";
import classNames from "classnames";
import { NEW_PREFIX } from "../SortingContext/SortingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addColumn, useAppDispatch } from "../../redux";
import { useAppDroppable } from "../../shared/sorting";

export function NewColumnButton() {
    const { setNodeRef, isOver } = useAppDroppable({
        id: NEW_PREFIX,
        data: {
            type: "assembler",
            supports: ["assembler", "item"]
        }
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