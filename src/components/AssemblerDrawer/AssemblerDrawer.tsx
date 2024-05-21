import { useMemo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useSelectRecipesByName } from "../../redux"
import CollapsingDrawer from "../CollapsingDrawer"
import EntitySelector from "../EntitySelector"
import RecipeCard from "./RecipeCard"
import { Button } from "../UI"
import { SimpleEntitySelector } from "../EntitySelector"
import { calculateIngredientsInRecipes } from "./calculateIngredientsInRecipes"
import ItemIcon from "../ItemIcon"

export function AssemblerDrawer() {
    const [drawerRecipeNames, setDrawerRecipeNames] = useState<string[]>([])
    const drawerRecipes = useSelectRecipesByName(drawerRecipeNames)

    // Ingredient Filtering
    const drawerIngredients = useMemo(
        () => calculateIngredientsInRecipes(drawerRecipes),
        // eslint-disable-next-line
        [drawerRecipeNames]
    )
    const [ingredientFilter, setIngredientFilter] = useState("")
    const filteredDrawerRecipes = !ingredientFilter ? drawerRecipes : drawerRecipes.filter(
        r => r?.ingredients.some(i => i.name === ingredientFilter)
    )

    const handleSelectorChange = (selected: string[]) => {
        // Toggle each between selected and unselected
        const toRemove = selected.filter(name => drawerRecipeNames.includes(name))
        const toAdd = selected.filter(name => !drawerRecipeNames.includes(name))
        setDrawerRecipeNames(drawerRecipeNames.filter(name => !toRemove.includes(name)).concat(toAdd))
    }

    const removeRecipe = (recipeName: string) => {
        setDrawerRecipeNames(drawerRecipeNames.filter(n => n !== recipeName))
    }

    const clearDrawer = () => {
        setDrawerRecipeNames([])
        setIngredientFilter("")
    }

    return (
        <CollapsingDrawer direction="up">
            <div className="p-3 pb-0">
                <div className="flex items-stretch">
                    <EntitySelector multi
                        onChange={handleSelectorChange}
                        type="recipe"
                        selected={drawerRecipeNames}
                    >
                        <span className="text-nowrap flex items-center gap-2">
                            <FontAwesomeIcon icon={faCaretDown} />
                            {drawerRecipeNames.length} Recipes
                        </span>
                    </EntitySelector>
                    <Button onClick={clearDrawer} aria-label="Clear Recipes"><FontAwesomeIcon icon={faTrash} /></Button>
                    <SimpleEntitySelector
                        value={ingredientFilter}
                        onChange={setIngredientFilter}
                        renderOptionLabel={(option) => (
                            <><ItemIcon name={option.name} size="md" /> {option.count}</>
                        )}
                        options={drawerIngredients}
                        emptyText="No Filter"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto py-3">
                    {filteredDrawerRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe.name}
                            recipe={recipe}
                            onRemove={removeRecipe}
                        />
                    ))}
                </div>
            </div>
        </CollapsingDrawer>
    )
}