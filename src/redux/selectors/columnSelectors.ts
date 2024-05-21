import { RootState } from "../types";
import { createAppSelector } from "./createAppSelector";
import { createAppSelectorHook } from "./createAppSelectorHook";
import { selectAllAssemblers, selectAllItems, selectAllRecipes, selectAllSupplyLines, selectColumnOrder } from "./basicSelectors";
import { Assembler, AssemblerFullData, AssemblerWithRecipe, Recipe } from "../../shared/types";

// Basic Selectors
const selectColumnById = (state: RootState, columnId: string) => state.mall.columnToAssemblers[columnId]
const selectColumnIndex = (state: RootState, columnId: string) => state.mall.columnOrder.indexOf(columnId)
const selectColumnToAssemblers = (state: RootState) => state.mall.columnToAssemblers

// Selector Hooks
export const useSelectColumnById = createAppSelectorHook(selectColumnById)
export const useSelectColumnOrder = createAppSelectorHook(selectColumnOrder)
export const useSelectColumnToAssemblers = createAppSelectorHook(selectColumnToAssemblers)

// Select Whole Mall
export const useSelectMall = createAppSelectorHook(createAppSelector(
    [
        selectColumnOrder,
        selectColumnToAssemblers,
        selectAllAssemblers,
        selectAllSupplyLines,
        selectAllRecipes,
        selectAllItems,
    ],
    (
        columnOrder, columnToAssemblers, allAssemblers, 
        supplyLines, allRecipes, allItems
    ): { supplyLines: string[][], assemblerLines: AssemblerWithRecipe[][]} => ({
        supplyLines,
        assemblerLines: columnOrder.map(
            columnId => columnToAssemblers[columnId].map(
                assemblerId => {
                    const assembler = allAssemblers[assemblerId]
                    const recipe = allRecipes.find(recipe => recipe.name === assembler.recipeName)!
                    const mainProduct = recipe.products[0]
                    return { 
                        ...assembler,
                        recipe: {
                            ...recipe,
                            mainProduct: allItems.find(item => item.name === mainProduct.name)!
                        }
                    }
                }
            )
        )
    })
))

// Assembler By Id Selector Hook
export const useSelectAssemblerById = createAppSelectorHook(createAppSelector(
    [
        (_, assemblerId: string | undefined) => assemblerId,
        selectColumnToAssemblers,
        selectColumnOrder,
        selectAllAssemblers,
        selectAllRecipes,
        selectAllSupplyLines,
    ],
    (assemblerId, columnToAssemblers, columnOrder, allAssemblers, allRecipes, supplyLines) => {
        if (!assemblerId) return undefined
        const assembler = allAssemblers[assemblerId]
        if (!assembler) return undefined
        const column = columnToAssemblers[assembler.columnId]
        const columnIndex = columnOrder.indexOf(assembler.columnId)
        return getAssemblerWithRecipeAndSatisfaction(
            assembler, allAssemblers, column, columnIndex, allRecipes, supplyLines
        )
    }
))

// Assemblers In Column Selector Hook
export const useSelectAssemblersInColumn = createAppSelectorHook(createAppSelector(
    [
        selectColumnById,
        selectColumnIndex,
        selectAllAssemblers,
        selectAllRecipes,
        selectAllSupplyLines,
    ],
    (column, columnIndex, allAssemblers, allRecipes, supplyLines) => column.map(assemblerId => {
        const assembler = allAssemblers[assemblerId]
        return getAssemblerWithRecipeAndSatisfaction(
            assembler, allAssemblers, column, columnIndex, allRecipes, supplyLines
        )
    })
))

// Helper function for Assembler By Id and Assemblers In Column
const getAssemblerWithRecipeAndSatisfaction = (
    assembler: Assembler,
    allAssemblers: Record<string, Assembler>,
    column: string[],
    columnIndex: number,
    allRecipes: Recipe[],
    supplyLines: string[][],
) => {
    const recipe = allRecipes.find(r => r.name === assembler.recipeName)

    // Get information for calculating satisfaction
    const index = column.indexOf(assembler.id)
    const adjacentAssemblerRecipes = [column[index - 1], column[index + 1]]
        .filter(assemblerId => assemblerId)
        .map(assemblerId => allRecipes.find(r => r.name === allAssemblers[assemblerId].recipeName))
    const adjacentSupplyLineItems = [...supplyLines[columnIndex], ...supplyLines[columnIndex + 1]]

    // Return assembler with injected data on recipe and ingredient satisfaction
    return {
        ...assembler,
        recipe: recipe && {
            ...recipe,
            ingredients: recipe.ingredients.map(ingredient => ({
                ...ingredient,
                satisfied: adjacentSupplyLineItems.some(item => item === ingredient.name)
                    || adjacentAssemblerRecipes.some(r => r?.products.some(p => p.name === ingredient.name))
            }))
        }
    } as AssemblerFullData
}