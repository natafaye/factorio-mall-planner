import { configureStore } from "@reduxjs/toolkit"
import { mallReducer } from "./mallSlice"
import { recipeReducer } from "./recipeSlice"

export const store = configureStore({
    reducer: {
        mall: mallReducer,
        recipes: recipeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch