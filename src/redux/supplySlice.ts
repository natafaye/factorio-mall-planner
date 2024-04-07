import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { 
    supplyList: Array<string>
} = {
    supplyList: []
}

export const supplySlice = createSlice({
    name: 'supplyLines',
    initialState,
    reducers: {
        addSupply: (state, action: PayloadAction<string>) => {
            return { ...state, supplyList: [...state.supplyList, action.payload] }
        }
    },
})

export const supplyReducer = supplySlice.reducer
export const { addSupply } = supplySlice.actions