import { selectAllItems, selectAllRecipes } from "./basicSelectors"
import { createAppSelector } from "./createAppSelector"
import { createAppSelectorHook } from "./createAppSelectorHook"

const fuzzyIncludes = (string: string, search: string) => string
  .replace(/[- ]/g, "")
  .includes(search.replace(/[- ]/g, ""))

const ingredientLabel = /^(i|ingredient): */

export const useSelectRecipesBySearch = createAppSelectorHook(createAppSelector(
    [
        selectAllRecipes,
        (_, searchTerm: string) => searchTerm
    ],
    (allRecipes, searchTerm) => !searchTerm ? [] : allRecipes.filter(r =>
      fuzzyIncludes(r.name, searchTerm)
      || (
        searchTerm.match(ingredientLabel)
        && r.ingredients.some(i => fuzzyIncludes(i.name, searchTerm.replace(ingredientLabel, "")))
      )
    )
  )
)

export const useSelectItemsBySearch = createAppSelectorHook(createAppSelector(
    [
        selectAllItems,
        (_, searchTerm: string) => searchTerm
    ],
    (allItems, searchTerm) => !searchTerm ? [] : allItems.filter(i =>
        fuzzyIncludes(i.name, searchTerm)
    )
))