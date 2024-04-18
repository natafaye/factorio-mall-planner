import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

const initialState: { 
    lines: Array<Array<string>>
} = {
    lines: [[], [], []]
}

export const supplySlice = createSlice({
    name: 'supplyLines',
    initialState,
    reducers: {
        addSupply: (state, action: PayloadAction<{ name: string, index: number}>) => {
            const { name, index } = action.payload
            state.lines[index].push(name)
        },
        removeSupply: (state, action: PayloadAction<{ name: string, index: number}>) => {
            const { name, index } = action.payload
            const nameIndex = state.lines[index].indexOf(name)
            state.lines[index].splice(nameIndex, 1)
        }
    },
})

export const supplyReducer = supplySlice.reducer
export const { addSupply, removeSupply } = supplySlice.actions

const selectAllSupplyLines = (state: RootState) => state.supplyLines.lines

export const makeSelectAdjacentSupplyLines = (columnId: string) =>
    createSelector(
        [selectAllSupplyLines],
        (allLines) => allLines.flatMap(line => line)
    )