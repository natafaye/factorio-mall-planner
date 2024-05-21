import { store } from "./store"
import { ThunkAction, UnknownAction } from "@reduxjs/toolkit"

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>