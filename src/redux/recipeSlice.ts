import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { defaultRecipes } from './defaultRecipes'
import { defaultItems } from './defaultItems'
import type { Item, Recipe } from '../types'
import { RootState } from './store'

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipeList: defaultRecipes,
    itemList: defaultItems
  },
  reducers: {
    loadRecipes: (state, action: PayloadAction<{
      recipes: Array<Recipe>,
      items: Array<Item>
    }>) => {
      state.recipeList = action.payload.recipes
      state.itemList = action.payload.items
    }
  },
})

export const recipeReducer = recipeSlice.reducer
export const { loadRecipes } = recipeSlice.actions

/***** Selectors *****/

const selectAllRecipes = (state: RootState) => state.recipes.recipeList

const selectAllItems = (state: RootState) => state.recipes.itemList

export const selectItemGroups = createSelector(
  [selectAllItems],
  (allItems) => [...new Set(allItems.map(i => i.group))]
)

export const makeSelectItemsInGroup = (selectedGroup: string) =>
  createSelector(
    [selectAllItems],
    (allItems) => allItems
      .filter(i => i.group === selectedGroup)
      .sort(sortBySubgroupThenOrder)
  )

  const sortBySubgroupThenOrder = (a: { subgroup: string, order: string }, b: { subgroup: string, order: string }) => {
    const subGroupValue = a.subgroup.localeCompare(b.subgroup)
    if(subGroupValue !== 0) return subGroupValue
    return a.order.localeCompare(b.order)
  }

export const selectRecipeGroups = createSelector(
  [selectAllRecipes],
  (allRecipes) => [...new Set(allRecipes.map(r => r.group))]
)

export const makeSelectRecipesInGroup = (selectedGroup: string) =>
  createSelector(
    [selectAllRecipes],
    (allRecipes) => allRecipes
      .filter(r => r.group === selectedGroup)
      .sort((a, b) => a.subgroup.localeCompare(b.subgroup))
  )

export const makeSelectRecipeByName = (recipeName: string) =>
  (state: RootState) => state.recipes.recipeList.find(
    r => r.name === recipeName
  )

// Searching

const fuzzyIncludes = (string: string, search: string) => string
  .replace(/[- ]/g, "")
  .includes(search.replace(/[- ]/g, ""))

const ingredientLabel = /^(i|ingredient): */

export const makeSelectRecipesBySearch = (searchTerm: string) =>
  createSelector(
    [selectAllRecipes],
    (allRecipes) => !searchTerm ? [] : allRecipes.filter(r =>
      fuzzyIncludes(r.name, searchTerm)
      || (
        searchTerm.match(ingredientLabel)
        && r.ingredients.some(i => fuzzyIncludes(i.name, searchTerm.replace(ingredientLabel, "")))
      )
    )
  )