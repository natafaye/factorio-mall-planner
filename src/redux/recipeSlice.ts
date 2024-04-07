import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { defaultRecipes } from '../utilities/defaultRecipes'

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