import { useState } from "react";
import Instructions from "./Instructions";
import FilePicker from "./FilePicker";
import { Button, Modal } from "../UI";
import { parseRecipes } from "./parseRecipes";
import { loadRecipes, resetRecipes, setSourceFile, useAppDispatch } from "../../redux";
import { useRecipeSourceFile } from "../../redux/selectors";

export default function RecipeListLoader() {
    const [modalOpen, setModalOpen] = useState(false)
    const [isError, setIsError] = useState(false)

    const file = useRecipeSourceFile()

    const [statusMessage, setStatusMessage] = useState(
        file?.name === "Previous Data" ? "Reloaded recipe settings from previous session" : ""
    )

    const dispatch = useAppDispatch()
    const handleSetFile = (file: File | null) => {
        dispatch(setSourceFile(file))
        if (!file) {
            dispatch(resetRecipes())
            setStatusMessage("Reset recipes to default Factorio recipes")
        } else {
            parseRecipes(file, ({ data, error, message }) => {
                if (data) {
                    dispatch(loadRecipes(data))
                }
                setIsError(error)
                setStatusMessage(message)
            })
        }
    }

    return (
        <div>
            <Button onClick={() => setModalOpen(true)}>Customize Recipes</Button>
            <Modal
                isOpen={modalOpen}
                title="Customize Recipes"
                toggle={() => setModalOpen(!modalOpen)}
            >
                <p className="mb-4 -mt-2">If you're using mods or settings that add or change recipes,
                    you can load in the exact recipe settings for your game.
                </p>
                <FilePicker onPick={handleSetFile} file={file} />
                <p className={"mt-2 " + (isError ? "text-red-300" : "text-green-300")}>
                    {statusMessage}
                </p>
                <div className="overflow-y-auto">
                    <Instructions />
                </div>
            </Modal>
        </div>
    )
}