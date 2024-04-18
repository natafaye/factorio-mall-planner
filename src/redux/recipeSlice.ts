import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { defaultRecipes } from '../utilities/defaultRecipes'
import type { Recipe } from '../types'
import { RootState } from './store'

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipeList: defaultRecipes
  },
  reducers: {
    loadRecipes: (state, action: PayloadAction<Array<Recipe>>) => {
      state.recipeList = action.payload
    }
  },
})

export const recipeReducer = recipeSlice.reducer
export const { loadRecipes } = recipeSlice.actions

const selectAllRecipes = (state: RootState) => state.recipes.recipeList

export const selectGroups = createSelector(
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