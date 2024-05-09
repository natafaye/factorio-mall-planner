import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { defaultRecipes } from './defaultRecipes'
import { defaultItems } from './defaultItems'
import type { Item, Recipe } from '../../types'

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipeList: defaultRecipes,
    recipeGroups: [...new Set(defaultRecipes.map(i => i.group))],
    itemList: defaultItems,
    itemGroups: [...new Set(defaultItems.map(i => i.group))]
  },
  reducers: {
    loadRecipes: (state, action: PayloadAction<{
      recipes: Array<Recipe>,
      items: Array<Item>
    }>) => {
      state.recipeList = action.payload.recipes
      state.recipeGroups = [...new Set(action.payload.recipes.map(i => i.group))]
      state.itemList = action.payload.items
      state.itemGroups = [...new Set(action.payload.items.map(i => i.group))]
    }
  },
})

export const recipeReducer = recipeSlice.reducer
export const { loadRecipes } = recipeSlice.actions