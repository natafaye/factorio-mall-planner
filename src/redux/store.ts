import { configureStore } from "@reduxjs/toolkit"
import { mallReducer } from "./slices/mallSlice"
import { recipeReducer } from "./slices/recipeSlice"
import { settingReducer } from "./slices/settingSlice"

export const store = configureStore({
    reducer: {
        mall: mallReducer,
        recipes: recipeReducer,
        settings: settingReducer
    }
})