import { useEffect, useState } from 'react'
import { Button } from '../../components/Button/Button.tsx'
import { CounterDisplay } from './CounterDisplay/CounterDisplay.tsx'
import styles from './Counter.module.css'
import { CounterSettings } from '../CounterSettings/CounterSettings.tsx'

type CounterSettingsType = {
  minCount: number
  maxCount: number
}

export const Counter = () => {
  const [settings, setSettings] = useState<CounterSettingsType>(() => {
    const savedSettings = localStorage.getItem('settings')

    if (!savedSettings) return { minCount: 0, maxCount: 5 }

    try {
      return JSON.parse(savedSettings)
    } catch {
      return { minCount: 0, maxCount: 5 }
    }
  })

  const [displayMessage, setDisplayMessage] = useState<string | null>(null)

  const [count, setCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('counterValue')

    if (!savedCount) return 0

    try {
      return JSON.parse(savedCount)
    } catch {
      return 0
    }
  })

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem('counterValue', JSON.stringify(count))
  }, [count])

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

  const applyCounterSettings = (minCount: number, maxCount: number) => {
    setSettings({ minCount, maxCount })
    setCount(minCount)
    setDisplayMessage(null)
  }

  const incrementCountHandler = () => {
    if (count >= settings.maxCount) return
    setCount(count + 1)
  }

  const resetCountHandler = () => {
    setCount(settings.minCount)
  }

  const setValidationError = (error: string) => {
    setDisplayMessage(error)
  }

  return (
    <>
      <CounterSettings applyCounterSettings={applyCounterSettings} setValidationError={setValidationError} />

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
