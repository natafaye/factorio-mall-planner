import { configureStore } from "@reduxjs/toolkit"
import { assemblerReducer } from "./assemblerSlice"
import { recipeReducer } from "./recipeSlice"
import { supplyReducer } from "./supplySlice"

export const store = configureStore({
    reducer: {
        assemblers: assemblerReducer,
        recipes: recipeReducer,
        supplyLines: supplyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch