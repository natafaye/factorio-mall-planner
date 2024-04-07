import { useState } from "react";
import Button, { FileInput } from "./Button";
import { useDispatch } from "react-redux";
import { loadRecipes } from "./recipeSlice";

export default function RecipeListLoader() {
    const [file, setFile] = useState<File | null>(null)
    const [statusMessage, setStatusMessage] = useState("")
    const [isError, setIsError] = useState(false)

    const dispatch = useDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setFile(event.target.files[0])
    }

    const parseRecipes = () => {
        if (!file) {
            setStatusMessage("You must select a file to parse")
            setIsError(true)
            return
        }
        try {
            const fileReader = new FileReader()
            fileReader.readAsText(file, "UTF-8")
            fileReader.onload = (e) => {
                if (e.target && typeof e.target.result === "string") {
                    const loadedRecipes = JSON.parse(e.target.result)
                    dispatch(loadRecipes(loadedRecipes))
                    setStatusMessage(`Loaded ${loadedRecipes.length} recipes`)
                    setIsError(false)
                } else {
                    setStatusMessage("You must select a file to parse")
                    setIsError(true)
                }
            }
        } catch (error) {
            setStatusMessage("There was an error parsing the file")
            setIsError(true)
        }
    }

    return (
        <div className="p-4">
            <FileInput accept=".json" onChange={handleChange} />
            <Button onClick={parseRecipes}>Parse</Button>
            <p className={"ps-2 " + (isError ? "text-red-300" : "text-green-300")}>{statusMessage}</p>
        </div>
    )
}