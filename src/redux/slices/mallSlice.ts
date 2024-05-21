import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from "uuid"
import type { Assembler, ColumnsToAssemblers} from '../../shared/types'

type NewAssemblerData = Omit<Assembler, "id" | "columnId"> & { columnId?: string }

/***** Initial State *****/

const starterId1 = uuid()

const initialState: {
    columnOrder: string[]
    columnToAssemblers: ColumnsToAssemblers
    assemblers: Record<string, Assembler>
    supplyLines: Array<string[]>
} = {
    columnOrder: [starterId1],
    columnToAssemblers: {
        [starterId1]: [],
    },
    assemblers: {},
    supplyLines: [[], []],
}


/***** Slice *****/

export const mallSlice = createSlice({
    name: 'mall',
    initialState,
    reducers: {

        // Assemblers
        addAssembler: (state, action: PayloadAction<NewAssemblerData>) => {
            let newColumnId = action.payload.columnId
            if(!newColumnId) {
                // Create the column
                newColumnId = uuid()
                state.columnToAssemblers[newColumnId] = []
                state.columnOrder.push(newColumnId)
                // Create the supply line
                state.supplyLines.push([])
            }
            const newAssembler = {
                id: uuid(),
                ...action.payload,
                columnId: newColumnId
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
            oldColumnId: string, newColumnId?: string, newIndex: number, assemblerId: string
        }>) => {
            const { oldColumnId, newIndex, assemblerId } = action.payload
            let { newColumnId } = action.payload

            const oldIndex = state.columnToAssemblers[oldColumnId].indexOf(assemblerId)
            state.columnToAssemblers[oldColumnId].splice(oldIndex, 1)

            // If there wasn't a new column specified, create a column
            // and move the assembler to the newly created column
            if (!newColumnId) {
                // Create the column
                newColumnId = uuid()
                state.columnToAssemblers[newColumnId] = []
                state.columnOrder.push(newColumnId)
                // Create the supply line
                state.supplyLines.push([])
            }

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
        addColumn: (state) => {
            const newColumnId = uuid()
            state.columnToAssemblers[newColumnId] = []
            state.columnOrder.push(newColumnId)
            state.supplyLines.push([])
        },
        removeColumn: (state, action: PayloadAction<string>) => {
            const columnIndex = state.columnOrder.indexOf(action.payload)
            // Remove contained assemblers
            state.columnToAssemblers[action.payload].forEach(
                assemblerId => delete state.assemblers[assemblerId]
            )
            state.columnToAssemblers[action.payload] = []
            // If this is the only column left, stop there
            if (state.columnOrder.length === 1) return
            // Merge surrounding supply lines
            const lineAfter = state.supplyLines[columnIndex + 1]
            state.supplyLines[columnIndex].push(...lineAfter)
            state.supplyLines.splice(columnIndex + 1, 1)
            // Remove column
            delete state.columnToAssemblers[action.payload]
            state.columnOrder.splice(columnIndex, 1)
        },

        // Supply Lines
        addSupply: (state, action: PayloadAction<{ name: string, index: number }>) => {
            const { name, index } = action.payload
            // Don't add a repeat
            if(state.supplyLines[index].includes(name)) return
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
    replaceAllColumns, addColumn, removeColumn,
    addSupply, removeSupply,
} = mallSlice.actions