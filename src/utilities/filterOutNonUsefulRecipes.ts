import { Recipe } from "../types";
import { getBaseName } from "./getBaseName";

export const filterOutNonUsefulRecipes = (recipeList: Array<Recipe>) => {
    return recipeList.filter(recipe =>
        !(
            (recipe.name.startsWith("empty") || recipe.name.startsWith("fill"))
            && recipe.name.endsWith("barrel")
        ) && !(
            recipe.ingredients.length === 1 
            && getBaseName(recipe.ingredients[0].name) === getBaseName(recipe.name)
        ) && !(
               recipe.group === "other"
            || recipe.group === "environment"
            || recipe.name.includes("delivery-cannon-pack-")
            || recipe.name.includes("delivery-cannon-weapon-pack-")
            || recipe.name.includes("delivery-cannon-artillery-")
            || recipe.name.includes("se-capsule-")
            || recipe.name.includes("reclaim-water")
            || recipe.name.startsWith("matter-to-")
            || recipe.name.endsWith("-to-matter")
            || recipe.name.endsWith("-to-parts")
            || recipe.name.endsWith("-to-particle-stream")
        )
    )
}