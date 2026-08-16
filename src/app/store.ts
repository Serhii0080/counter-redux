import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '@/features/counter/model/counter-reducer'
import { counterSettingsReducer } from '@/features/counter/model/counter-settings-reducer'

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  counterReducer,
  counterSettingsReducer,
})

// создание store
export const store = configureStore({
  reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch
