import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from "uuid"
import type { Assembler, Belt, ColumnsToAssemblers} from '../../shared/types'

type NewAssemblerData = Omit<Assembler, "id" | "columnId"> & { columnId?: string }

type SupplyIndex = [number, number, number]

const getEmptyBelt = (): Belt => [undefined, undefined, uuid()]

/***** Initial State *****/

const starterId1 = uuid()

const initialState: {
    columnOrder: string[]
    columnToAssemblers: ColumnsToAssemblers
    assemblers: Record<string, Assembler>
    supplyLines: Belt[][]
} = {
    columnOrder: [starterId1],
    columnToAssemblers: {
        [starterId1]: [],
    },
    assemblers: {},
    supplyLines: [[getEmptyBelt()], [getEmptyBelt()]],
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
                state.supplyLines.push([getEmptyBelt()])
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
                state.supplyLines.push([getEmptyBelt()])
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
            state.supplyLines.push([getEmptyBelt()])
        },
        removeColumn: (state, action: PayloadAction<string>) => {
            const lineIndex = state.columnOrder.indexOf(action.payload)
            // Remove contained assemblers
            state.columnToAssemblers[action.payload].forEach(
                assemblerId => delete state.assemblers[assemblerId]
            )
            state.columnToAssemblers[action.payload] = []
            // If this is the only column left, stop there
            if (state.columnOrder.length === 1) return
            // Merge surrounding supply lines
            const lineAfter = state.supplyLines[lineIndex + 1]
            // Remove empty last belt from earlier line
            state.supplyLines[lineIndex].pop()
            // Push the belts from the later line
            state.supplyLines[lineIndex].push(...lineAfter)
            state.supplyLines.splice(lineIndex + 1, 1)
            // Remove column
            delete state.columnToAssemblers[action.payload]
            state.columnOrder.splice(lineIndex, 1)
        },

        // Supply Lines
        addSupply: (state, action: PayloadAction<{ name: string, index: SupplyIndex }>) => {
            const { name, index: [lineIndex, beltIndex, itemIndex] } = action.payload
            const line = state.supplyLines[lineIndex]
            line[beltIndex][itemIndex] = name
            // if we just added something to the last belt, add another belt
            if(beltIndex === line.length - 1) {
                line.push(getEmptyBelt())
            }
        },
        removeSupply: (state, action: PayloadAction<{ index: SupplyIndex }>) => {
            const { index: [lineIndex, beltIndex, itemIndex] } = action.payload
            const line = state.supplyLines[lineIndex]
            const belt = line[beltIndex]
            belt[itemIndex] = undefined
            // if this belt has become empty and it's not the last belt, delete it
            if(!belt[0] && !belt[1] && beltIndex !== line.length - 1) {
                line.splice(beltIndex, 1)
            }
        },
        swapSupply: (state, action: PayloadAction<{ startIndex: SupplyIndex, endIndex: SupplyIndex}>) => {
            const { 
                startIndex: [startLineIndex, startBeltIndex, startItemIndex], 
                endIndex: [endLineIndex, endBeltIndex, endItemIndex]
            } = action.payload
            const startLine = state.supplyLines[startLineIndex]
            const startBelt = startLine[startBeltIndex]
            const startItem = startBelt[startItemIndex]
            const endLine = state.supplyLines[endLineIndex]
            const endBelt = endLine[endBeltIndex]

            // Swap the items
            endBelt[endItemIndex] = startItem
            startBelt[startItemIndex] = undefined

            // If we added something to a last belt, add a new belt on the end
            if(endBeltIndex === endLine.length - 1) {
                endLine.push(getEmptyBelt())
            }
            // If we cleared a belt that's not the last belt, remove it
            if(!startBelt[0] && !startBelt[1] && startBeltIndex !== startLine.length - 1) {
                startLine.splice(startBeltIndex, 1)
            }
        }

    },
})

export const mallReducer = mallSlice.reducer
export const {
    addAssembler, removeAssembler, moveAssembler,
    replaceAllColumns, addColumn, removeColumn,
    addSupply, removeSupply, swapSupply
} = mallSlice.actions