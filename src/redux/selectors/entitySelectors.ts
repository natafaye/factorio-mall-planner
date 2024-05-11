import type { RootState } from "../store"
import type { BaseEntity, Recipe } from "../types"
import { selectAllRecipes } from "./basicSelectors"
import { createAppSelector } from "./createAppSelector"
import { createAppSelectorHook } from "./createAppSelectorHook"

const selectAllEntitiesByType = (state: RootState, type: "item" | "recipe") =>
    (type === "recipe") ? state.recipes.recipeList : state.recipes.itemList

// All Recipes

export const useSelectAllRecipes = createAppSelectorHook(state => state.recipes.recipeList)

// Recipe By Name

export const useSelectRecipesByName = createAppSelectorHook(createAppSelector(
    [
        selectAllRecipes,
        (_, names: string[]) => names
    ],
    (allRecipes, names) => names
        .map(name => allRecipes.find(r => r.name === name))
        .filter(r => r) as Recipe[]
))

// Groups

export const useSelectGroups = createAppSelectorHook(
    (state: RootState, type: "item" | "recipe") =>
        (type === "recipe") ? state.recipes.recipeGroups : state.recipes.itemGroups
)

export const useSelectInGroup = createAppSelectorHook(createAppSelector(
    [
        selectAllEntitiesByType,
        (_, __, selectedGroup: string) => selectedGroup
    ],
    (allEntities, selectedGroup): BaseEntity[] => allEntities
        .filter(e => e.group === selectedGroup)
        .sort(sortBySubgroupThenOrder)
))

const sortBySubgroupThenOrder = (
    a: { subgroup: string, order?: string }, 
    b: { subgroup: string, order?: string }
) => {
    const subGroupValue = a.subgroup.localeCompare(b.subgroup)
    if (subGroupValue !== 0) return subGroupValue
    const orderValue = a.order?.localeCompare(b.order || "")
    return orderValue || subGroupValue
}

// Search

const fuzzyIncludes = (string: string, search: string) => string
    .replace(/[- ]/g, "")
    .includes(search.replace(/[- ]/g, ""))

const ingredientLabel = /^(i|ingredient): */

export const useSelectBySearch = createAppSelectorHook(createAppSelector(
    [
        selectAllEntitiesByType,
        (_, type: "item" | "recipe") => type,
        (_, __, searchTerm: string) => searchTerm,
    ],
    (allRecipes, type, searchTerm): BaseEntity[] => !searchTerm ? [] : allRecipes.filter(e =>
        fuzzyIncludes(e.name, searchTerm)
        || (
            type === "recipe"
            && searchTerm.match(ingredientLabel)
            && (e as Recipe).ingredients.some(i =>
                fuzzyIncludes(i.name, searchTerm.replace(ingredientLabel, ""))
            )
        )
    )
)
)