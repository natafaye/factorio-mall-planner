import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { defaultRecipes } from './defaultRecipes'
import { defaultItems } from './defaultItems'
import type { Item, Recipe } from '../../shared/types'
import { AppThunk } from '../types'

type LoadedData = { items: Item[], recipes: Recipe[] }

const DEFAULT_DATA: LoadedData = { recipes: defaultRecipes, items: defaultItems } as const

// Thunks

export const loadRecipes = (data: LoadedData): AppThunk => (dispatch) => {
  dispatch(setRecipes(data))
  localStorage.setItem('factorio-data', JSON.stringify(data))
}

export const resetRecipes = (): AppThunk => (dispatch) => {
  dispatch(setRecipes(DEFAULT_DATA))
  localStorage.removeItem('factorio-data')
}

// Initial State

const localStorageData = localStorage.getItem("factorio-data")
const loadedData: LoadedData = localStorageData ? JSON.parse(localStorageData) : DEFAULT_DATA

const initialState = {
  recipeList: loadedData.recipes,
  recipeGroups: [...new Set(defaultRecipes.map(i => i.group))],
  itemList: loadedData?.items,
  itemGroups: [...new Set(defaultItems.map(i => i.group))],
  sourceFile: localStorageData ? new File([], "Previous Data") : null
}

// Slice

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<LoadedData>) => {
      state.recipeList = action.payload.recipes
      state.recipeGroups = [...new Set(action.payload.recipes.map(i => i.group))]
      state.itemList = action.payload.items
      state.itemGroups = [...new Set(action.payload.items.map(i => i.group))]
    },
    setSourceFile: (state, action: PayloadAction<File | null>) => {
      state.sourceFile = action.payload
    }
  },
})

export const recipeReducer = recipeSlice.reducer
export const { setRecipes, setSourceFile } = recipeSlice.actions