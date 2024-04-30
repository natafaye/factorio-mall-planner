import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from "uuid"
import type { Assembler, ColumnsToAssemblers } from '../types'
import { RootState } from './store'

/***** Initial State *****/

const starterId1 = uuid()
const starterId2 = uuid()

const initialState: {
    columnOrder: string[]
    columnToAssemblers: ColumnsToAssemblers
    assemblers: Record<string, Assembler>
    supplyLines: Array<string[]>
} = {
    columnOrder: [starterId1, starterId2],
    columnToAssemblers: {
        [starterId1]: [],
        [starterId2]: []
    },
    assemblers: {},
    supplyLines: [[], [], []],
}


/***** Slice *****/

export const mallSlice = createSlice({
    name: 'mall',
    initialState,
    reducers: {

        // Assemblers
        addAssembler: (state, action: PayloadAction<Omit<Assembler, "id">>) => {
            const newAssembler = {
                id: uuid(),
                ...action.payload
            }
            state.columnToAssemblers[newAssembler.columnId].push(newAssembler.id)
            state.assemblers[newAssembler.id] = newAssembler
        },
        removeAssembler: (state, action: PayloadAction<Assembler>) => {
            const { id, columnId } = action.payload
            delete state.assemblers[id]
            const index = state.columnToAssemblers[columnId].indexOf(id)
            state.columnToAssemblers[columnId].splice(index, 1)
        },
        moveAssembler: (state, action: PayloadAction<{
            oldColumnId: string, newColumnId: string, newIndex: number, assemblerId: string
        }>) => {
            const { oldColumnId, newColumnId, newIndex, assemblerId } = action.payload

            const oldIndex = state.columnToAssemblers[oldColumnId].indexOf(assemblerId)
            state.columnToAssemblers[oldColumnId].splice(oldIndex, 1)

            state.columnToAssemblers[newColumnId] = [
                ...state.columnToAssemblers[newColumnId].slice(0, newIndex),
                assemblerId,
                ...state.columnToAssemblers[newColumnId].slice(newIndex)
            ]

            state.assemblers[assemblerId] = {
                ...state.assemblers[assemblerId],
                columnId: newColumnId
            }
        },

        // Columns
        replaceAllColumns: (state, action: PayloadAction<ColumnsToAssemblers>) => {
            state.columnToAssemblers = action.payload
        },

        // Supply Lines
        addSupply: (state, action: PayloadAction<{ name: string, index: number }>) => {
            const { name, index } = action.payload
            state.supplyLines[index].push(name)
        },
        removeSupply: (state, action: PayloadAction<{ name: string, index: number }>) => {
            const { name, index } = action.payload
            const nameIndex = state.supplyLines[index].indexOf(name)
            state.supplyLines[index].splice(nameIndex, 1)
        }
        
    },
})

export const mallReducer = mallSlice.reducer
export const { 
    addAssembler, removeAssembler, moveAssembler, 
    replaceAllColumns, 
    addSupply, removeSupply 
} = mallSlice.actions


/***** Selectors *****/

// Basic selectors

export const selectColumnOrder = (state: RootState) => state.mall.columnOrder

export const selectColumnToAssemblers = (state: RootState) => state.mall.columnToAssemblers

const selectAllAssemblers = (state: RootState) => state.mall.assemblers

const selectAllSupplyLines = (state: RootState) => state.mall.supplyLines

// Selector creators

const makeSelectColumnIndex = (columnId: string) => 
    (state: RootState) => state.mall.columnOrder.indexOf(columnId)

export const makeSelectAssemblerById = (assemblerId: string | null) => 
    (state: RootState) => assemblerId ? state.mall.assemblers[assemblerId] : undefined

export const makeSelectColumnById = (columnId: string) =>
    (state: RootState) => state.mall.columnToAssemblers[columnId]

export const makeSelectSupplyLineByIndex = (index: number) => 
    (state: RootState) => state.mall.supplyLines[index]

export const makeSelectAssemblersInColumn = (columnId: string) =>
    createSelector(
        [
            makeSelectColumnById(columnId),
            selectAllAssemblers
        ],
        (column, allAssemblers) => column.map(id => allAssemblers[id])
    )

export const makeSelectAdjacentSupplyLines = (columnId: string) =>
    createSelector(
        [
            selectAllSupplyLines,
            makeSelectColumnIndex(columnId)
        ],
        (supplyLines, index) => [...supplyLines[index], ...supplyLines[index + 1]]
    )