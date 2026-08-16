import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { selectCounter, selectCounterSettings } from '@/features/counter/model'
import { incrementCountAC, resetAC } from '@/features/counter/model/counter-reducer'
import { CounterDisplay } from '@/features/counter/ui/Counter/CounterDisplay/CounterDisplay'
import { CounterSettings } from '@/features/counter/ui/Counter/CounterSettings/CounterSettings'
import { useState } from 'react'

import styles from './Counter.module.css'
import { Button } from '@/common/components/Button'

export const Counter = () => {
  const [displayMessage, setDisplayMessage] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const count = useAppSelector(selectCounter)
  const settings = useAppSelector(selectCounterSettings)

  const enterValuesMessage = `enter values and press 'set'`
  const incorrectValueError = 'Incorrect value!'

  const displayClassName =
    displayMessage === enterValuesMessage
      ? styles.displayMessage
      : displayMessage === incorrectValueError
        ? styles.displayError
        : count === settings.maxCount
          ? styles.displayMaxCount
          : styles.displayCount

  const incrementCountHandler = () => {
    if (count >= settings.maxCount) return
    dispatch(incrementCountAC())
  }

  const resetCountHandler = () => {
    dispatch(resetAC({ minCount: settings.minCount }))
  }

  const handleDisplayMessageChange = (message: string | null) => {
    setDisplayMessage(message)
  }

  return (
    <>
      <CounterSettings handleDisplayMessageChange={handleDisplayMessageChange} />

      <div className={styles.counter}>
        <div className={styles.display}>
          <CounterDisplay className={displayClassName} title={displayMessage ? displayMessage : count} />
        </div>

        <div className={styles.controls}>
          <Button
            disabled={count === settings.maxCount || displayMessage !== null}
            onClick={incrementCountHandler}
            title={'inc'}
          />

          <Button disabled={displayMessage !== null} onClick={resetCountHandler} title={'reset'} />
        </div>
      </div>
    </>
  )
}
