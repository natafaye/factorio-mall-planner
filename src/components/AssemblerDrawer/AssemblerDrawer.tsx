import { useMemo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"
import { useSelectRecipesByName } from "../../redux"
import CollapsingDrawer from "../CollapsingDrawer"
import EntitySelector from "../EntitySelector"
import RecipeCard from "./RecipeCard"
import ItemIcon from "../ItemIcon"
import { Button } from "../UI"

export function AssemblerDrawer() {
    const [drawerRecipeNames, setDrawerRecipeNames] = useState<string[]>([])
    const drawerRecipes = useSelectRecipesByName(drawerRecipeNames)

    const drawerIngredients = useMemo(() => drawerRecipes.reduce(
        (ingredients: Array<{ name: string, count: number }>, recipe) => {
            recipe.ingredients.forEach(a => {
                let ingredient = ingredients.find(b => a.name === b.name)
                if (!ingredient) {
                    ingredient = { name: a.name, count: 0 }
                    ingredients.push(ingredient)
                }
                ingredient.count++
            })
            return ingredients
        }, []).sort((a, b) => b.count - a.count),
        [drawerRecipeNames]
    )

    const [ingredientFilter, setIngredientFilter] = useState<string | null>(null)
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
        setIngredientFilter(null)
    }

    return (
        <CollapsingDrawer direction="up">
            <div className="p-3 pb-0">
                <div className="flex items-center">
                    <EntitySelector multi
                        onChange={handleSelectorChange}
                        type="recipe"
                        selected={drawerRecipeNames}
                    >
                        <span className="text-nowrap">
                            <FontAwesomeIcon icon={faCaretDown} />{" "}
                            {drawerRecipeNames.length} Recipes
                        </span>
                    </EntitySelector>
                    <Button onClick={clearDrawer}><FontAwesomeIcon icon={faTrash} /></Button>
                    <div className="flex flex-wrap gap-1 items-center my-3 mx-2">
                        {drawerIngredients.map(ingredient => (
                            <button
                                className={classNames(
                                    "p-1 rounded flex items-center gap-1 hover:bg-stone-600",
                                    ingredientFilter === ingredient.name ?
                                        "bg-stone-700" :
                                        "bg-stone-800"
                                )}
                                key={ingredient.name}
                                onClick={() => setIngredientFilter(ingredient.name)}
                            >
                                <ItemIcon name={ingredient.name} size="sm" />
                                {ingredient.count}
                            </button>
                        ))}
                        {ingredientFilter &&
                            <button
                                className="flex bg-stone-800 hover:bg-stone-600 p-1 gap-1 items-center"
                                onClick={() => setIngredientFilter(null)}
                            >
                                <FontAwesomeIcon className="text-red-500" icon={faXmark} />
                                <span>Clear Filter</span>
                            </button>
                        }
                    </div>
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