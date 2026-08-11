import styles from './CounterSettings.module.css'
import { Button } from '../../components/Button/Button.tsx'
import { Input } from '../../components/Input/Input.tsx'
import { ChangeEvent, useState } from 'react'

type Props = {
  applyCounterSettings: (minCount: number, maxCount: number) => void
  setValidationError: (error: string) => void
}

export const CounterSettings = ({ applyCounterSettings, setValidationError }: Props) => {
  const [inputMaxValue, setInputMaxValue] = useState<string>(() => {
    const saveMaxValue = localStorage.getItem('inputMaxValue')
    return saveMaxValue ?? '5'
  })

  const [inputMinValue, setInputMinValue] = useState<string>(() => {
    const saveMinValue = localStorage.getItem('inputMinValue')
    return saveMinValue ?? '0'
  })

  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const minNumberValue = Number(inputMinValue)
  const maxNumberValue = Number(inputMaxValue)

  const isMaxValueInvalid = maxNumberValue <= minNumberValue ? styles.inputError : ''
  const isMinValueInvalid =
    minNumberValue >= maxNumberValue || minNumberValue < 0 || inputMinValue === '' ? styles.inputError : ''

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const maxValue = input.id === 'maxCount' ? input.value : inputMaxValue
    const minValue = input.id === 'minCount' ? input.value : inputMinValue
    if (maxValue !== inputMaxValue) setInputMaxValue(maxValue)
    if (minValue !== inputMinValue) setInputMinValue(minValue)
    if (minValue === '' || maxValue === '') {
      setValidationError('Incorrect value!')
      setIsDisabled(true)
      return
    }

    const minNumberValue = Number(minValue)
    const maxNumberValue = Number(maxValue)
    updateSettingsStatus(minNumberValue, maxNumberValue)
  }

  const updateSettingsStatus = (minValue: number, maxValue: number) => {
    const showPressSet = minValue >= 0 && minValue < maxValue

    if (showPressSet) {
      setValidationError(`enter values and press 'set'`)
      setIsDisabled(false)
    } else {
      setValidationError('Incorrect value!')
      setIsDisabled(true)
    }
  }

  const onClickHandler = () => {
    if (minNumberValue >= 0 && minNumberValue < maxNumberValue) {
      localStorage.setItem('inputMaxValue', inputMaxValue)
      localStorage.setItem('inputMinValue', inputMinValue)
      applyCounterSettings(minNumberValue, maxNumberValue)
      setIsDisabled(true)
    }
  }

  return (
    <div className={styles.counterSettings}>
      <div className={styles.display}>
        <div className={styles.inputsWrapper}>
          <label htmlFor="maxCount" className={styles.label}>
            max value:
            <Input className={isMaxValueInvalid} onChange={inputChangeHandler} value={inputMaxValue} id="maxCount" />
          </label>

          <label htmlFor="minCount" className={styles.label}>
            start value:
            <Input className={isMinValueInvalid} onChange={inputChangeHandler} value={inputMinValue} id="minCount" />
          </label>
        </div>
      </div>

      <div className={styles.controlsSettings}>
        <Button disabled={isDisabled} title={'set'} onClick={onClickHandler} />
      </div>
    </div>
  )
}
