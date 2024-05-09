import { useSelector } from "react-redux"
import { RootState } from "../store"

// Taken from Reselect Documentation
// https://reselect.js.org/FAQ#how-can-i-make-a-curried-selector

export const createAppSelectorHook = <
  Result,
  Params extends readonly unknown[]
>(
  selector: (state: RootState, ...params: Params) => Result
) => {
  return (...args: Params) => {
    return useSelector((state: RootState) => selector(state, ...args))
  }
}