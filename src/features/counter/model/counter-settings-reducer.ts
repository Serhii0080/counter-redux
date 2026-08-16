import { createAction, createReducer } from '@reduxjs/toolkit'
import type { CounterSettingsType } from './counter-settings-types'

export const applyCounterSettingsAC = createAction<{ minCount: number; maxCount: number }>(
  'counterSettings/applyCounterSettings',
)

const initialState: CounterSettingsType = { minCount: 0, maxCount: 5 }

export const counterSettingsReducer = createReducer(initialState, (builder) => {
  builder.addCase(applyCounterSettingsAC, (state, action) => {
    state.minCount = action.payload.minCount
    state.maxCount = action.payload.maxCount
  })
})
