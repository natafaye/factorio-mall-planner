import { createAppSelector } from "./createAppSelector"
import { createAppSelectorHook } from "./createAppSelectorHook"
import { selectAllRecipes } from "./basicSelectors"

export const useSelectRecipeGroups = createAppSelectorHook(state => state.recipes.recipeGroups)

export const useSelectRecipesInGroup = createAppSelectorHook(createAppSelector(
    [
        selectAllRecipes,
        (_, selectedGroup: string) => selectedGroup
    ],
    (allRecipes, selectedGroup) => allRecipes
        .filter(r => r.group === selectedGroup)
        .sort((a, b) => a.subgroup.localeCompare(b.subgroup))
))

// export const selectRecipeByName = (recipeName: string) =>
//     (state: RootState) => state.recipes.recipeList.find(
//         r => r.name === recipeName
//     )