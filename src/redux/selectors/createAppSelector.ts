import { createSelector } from "@reduxjs/toolkit"
import { UnknownMemoizer, weakMapMemoize, Selector } from "reselect"
import { RootState } from "../types"

// Taken from Reselect Documentation
// https://reselect.js.org/FAQ#how-can-i-make-a-pre-typed-version-of-createselector-for-my-root-state

export type TypedCreateSelector<
  State,
  MemoizeFunction extends UnknownMemoizer = typeof weakMapMemoize,
  ArgsMemoizeFunction extends UnknownMemoizer = typeof weakMapMemoize
> = <
  InputSelectors extends readonly Selector<State>[],
  Result,
  OverrideMemoizeFunction extends UnknownMemoizer = MemoizeFunction,
  OverrideArgsMemoizeFunction extends UnknownMemoizer = ArgsMemoizeFunction
>(
  ...createSelectorArgs: Parameters<
    typeof createSelector<
      InputSelectors,
      Result,
      OverrideMemoizeFunction,
      OverrideArgsMemoizeFunction
    >
  >
) => ReturnType<
  typeof createSelector<
    InputSelectors,
    Result,
    OverrideMemoizeFunction,
    OverrideArgsMemoizeFunction
  >
>

export const createAppSelector: TypedCreateSelector<RootState> = createSelector