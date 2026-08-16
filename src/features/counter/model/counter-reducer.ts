import { createAction, createReducer } from '@reduxjs/toolkit'

export const setCountToMinAC = createAction<{ minCount: number }>('counter/setCountToMin')

export const incrementCountAC = createAction('counter/incrementCount')

export const resetAC = createAction<{ minCount: number }>('counter/reset')

const initialState: number = 0

export const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCountToMinAC, (_, action) => {
      return action.payload.minCount
    })
    .addCase(incrementCountAC, (state) => {
      return state + 1
    })
    .addCase(resetAC, (_, action) => {
      return action.payload.minCount
    })
})
