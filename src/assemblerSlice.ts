import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from "uuid"

const ORDER_GAP = 1000

const initialState: { 
    columnList: Array<string>
    assemblerList: Array<Assembler>
    nextOrder: number
} = {
    columnList: [uuid(), uuid()],
    assemblerList: [],
    nextOrder: ORDER_GAP
}

export const assemblerSlice = createSlice({
    name: 'assemblers',
    initialState,
    reducers: {
        addAssembler: (state, action: PayloadAction<Pick<Assembler, "recipeName" | "columnId">>) => {
            const newAssembler = {
                id: uuid(),
                order: state.nextOrder,
                ...action.payload
            }
            state.nextOrder += ORDER_GAP
            state.assemblerList.push(newAssembler)
        },
        removeAssembler: (state, action: PayloadAction<string>) => {
            return { ...state, assemblerList: state.assemblerList.filter(a => a.id !== action.payload) }
        },
        moveAssembler: (state, action: PayloadAction<{ assemblerId: string, newColumnId: string, droppedOnOrder?: number}>) => {
            const { assemblerId, newColumnId, droppedOnOrder } = action.payload
            const assembler = state.assemblerList.find(a => a.id === assemblerId)
            if(assembler) {
                assembler.columnId = newColumnId
                if(droppedOnOrder !== undefined) {
                    let afterDroppedOnOrder = state.assemblerList.reduce(
                        (closestOrder, a) => (
                            a.order > droppedOnOrder
                            && a.order !== assembler.order
                            && a.order - droppedOnOrder < closestOrder - droppedOnOrder
                        ) ? a.order : closestOrder,
                        state.nextOrder
                    )
                    if(afterDroppedOnOrder === state.nextOrder) {
                        assembler.order = state.nextOrder
                        state.nextOrder += ORDER_GAP
                    }
                    assembler.order = Math.round((droppedOnOrder + afterDroppedOnOrder) / 2)
                } else {
                    assembler.order = state.nextOrder
                    state.nextOrder += ORDER_GAP
                }
            }
        }
    },
})

export const assemblerReducer = assemblerSlice.reducer
export const { addAssembler, removeAssembler, moveAssembler } = assemblerSlice.actions