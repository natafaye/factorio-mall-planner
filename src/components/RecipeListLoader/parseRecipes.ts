import { Item, Recipe } from "../../redux"
import { filterOutNonUseful } from "./filterOutNonUseful"

type ParseResults = {
    error: boolean,
    message: string,
    data?: {
        items: Item[],
        recipes: Recipe[]
    }
}

export const parseRecipes = (file: File | null, onParse: (results: ParseResults) => void) => {
    if (!file) {
        onParse({
            error: true,
            message: "You must select a file to parse",
        })
        return
    }
    try {
        const fileReader = new FileReader()
        fileReader.readAsText(file, "UTF-8")
        fileReader.onload = (e) => {
            if (!e.target || typeof e.target.result !== "string") {
                onParse({
                    error: true,
                    message: "You must select a file to parse",
                })
                return
            }

            const { recipes, items } = JSON.parse(e.target.result)
            const usefulRecipes = filterOutNonUseful<Recipe>(recipes)
            const usefulItems = filterOutNonUseful<Item>(items)
            onParse({
                data: {
                    recipes: usefulRecipes,
                    items: usefulItems
                },
                error: false,
                message: `Loaded ${usefulRecipes.length} recipes and ${usefulItems.length
                    } items, filtered out ${recipes.length - usefulRecipes.length
                    } recipes and ${items.length - usefulItems.length} items`
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            onParse({
                error: true,
                message: "There was an error parsing the file: " + error.message,
            })
        }
    }
}