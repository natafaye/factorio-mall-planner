import { Recipe } from "../../shared/types";

export const calculateIngredientsInRecipes = (recipes: Recipe[]) => recipes.reduce(
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
    }, []
).sort((a, b) => b.count - a.count)