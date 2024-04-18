import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from "uuid"
import type { Assembler } from '../types'
import { RootState } from './store'

export type Columns = Record<string, Array<string>>

const initialState: {
    columns: Columns
    assemblerList: Record<string, Assembler>
} = {
    columns: {
        [uuid()]: [],
        [uuid()]: []
    },
    assemblerList: {}
}

export const assemblerSlice = createSlice({
    name: 'assemblers',
    initialState,
    reducers: {
        addAssembler: (state, action: PayloadAction<Omit<Assembler, "id">>) => {
            const newAssembler = {
                id: uuid(),
                ...action.payload
            }
            state.columns[newAssembler.columnId].push(newAssembler.id)
            state.assemblerList[newAssembler.id] = newAssembler
        },
        removeAssembler: (state, action: PayloadAction<Assembler>) => {
            const { id, columnId } = action.payload
            delete state.assemblerList[id]
            const index = state.columns[columnId].indexOf(id)
            state.columns[columnId].splice(index, 1)
        },
        replaceColumns: (state, action: PayloadAction<Columns>) => {
            state.columns = action.payload
        },
        moveAssembler: (state, action: PayloadAction<{
            oldColumnId: string, newColumnId: string, newIndex: number, assemblerId: string
        }>) => {
            const { oldColumnId, newColumnId, newIndex, assemblerId } = action.payload

            const oldIndex = state.columns[oldColumnId].indexOf(assemblerId)
            state.columns[oldColumnId].splice(oldIndex, 1)

            state.columns[newColumnId] = [
                ...state.columns[newColumnId].slice(0, newIndex),
                assemblerId,
                ...state.columns[newColumnId].slice(newIndex)
            ]

            state.assemblerList[assemblerId] = { 
                ...state.assemblerList[assemblerId], 
                columnId: newColumnId
            }
        }
    },
})

export const assemblerReducer = assemblerSlice.reducer
export const { addAssembler, removeAssembler, moveAssembler, replaceColumns } = assemblerSlice.actions

export const makeSelectColumnById = (columnId: string) =>
    (state: RootState) => state.assemblers.columns[columnId]

const selectAllAssemblers = (state: RootState) => state.assemblers.assemblerList

export const makeSelectAssemblersInColumn = (columnId: string) =>
    createSelector(
        [
            makeSelectColumnById(columnId),
            selectAllAssemblers
        ],
        (column, allAssemblers) => column.map(id => allAssemblers[id])
    )