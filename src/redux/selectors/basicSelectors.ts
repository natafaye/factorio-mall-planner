import { createAppSelectorHook } from "./createAppSelectorHook"
import { RootState } from "../store"

export const selectColumnOrder = (state: RootState) => state.mall.columnOrder
export const selectAllAssemblers = (state: RootState) => state.mall.assemblers
export const selectAllSupplyLines = (state: RootState) => state.mall.supplyLines
export const selectAllRecipes = (state: RootState) => state.recipes.recipeList
export const selectAllItems = (state: RootState) => state.recipes.itemList
export const selectSettings = (state: RootState) => state.settings

export const useSelectSettings = createAppSelectorHook(selectSettings)

export const useSelectSupplyLineByIndex = createAppSelectorHook(
  (state, index: number) => state.mall.supplyLines[index]
)

