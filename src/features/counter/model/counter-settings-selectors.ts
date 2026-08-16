import type { RootState } from '@/app/store'

export const selectCounterSettings = (state: RootState) => state.counterSettingsReducer
