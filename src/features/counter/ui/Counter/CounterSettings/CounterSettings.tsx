import { Button } from '@/common/components/Button'
import { Input } from '@/common/components/Input'
import { setCountToMinAC } from '@/features/counter/model/counter-reducer'
import { applyCounterSettingsAC } from '@/features/counter/model/counter-settings-reducer'
import { ChangeEvent, useState } from 'react'
import styles from './CounterSettings.module.css'
import { useAppDispatch } from '@/common/hooks'

type Props = {
  handleDisplayMessageChange: (message: string | null) => void
}

export const CounterSettings = ({ handleDisplayMessageChange }: Props) => {
  const [inputMaxValue, setInputMaxValue] = useState<string>('5')

  const [inputMinValue, setInputMinValue] = useState<string>('0')

  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const dispatch = useAppDispatch()

  const minCount = Number(inputMinValue)
  const maxCount = Number(inputMaxValue)

  const isMaxValueInvalid = maxCount <= minCount ? styles.inputError : ''
  const isMinValueInvalid = minCount >= maxCount || minCount < 0 || inputMinValue === '' ? styles.inputError : ''

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const maxValue = input.id === 'maxCount' ? input.value : inputMaxValue
    const minValue = input.id === 'minCount' ? input.value : inputMinValue
    if (maxValue !== inputMaxValue) setInputMaxValue(maxValue)
    if (minValue !== inputMinValue) setInputMinValue(minValue)
    if (minValue === '' || maxValue === '') {
      handleDisplayMessageChange('Incorrect value!')
      setIsDisabled(true)
      return
    }

    const minCount = Number(minValue)
    const maxCount = Number(maxValue)
    updateSettingsStatus(minCount, maxCount)
  }

  const updateSettingsStatus = (minValue: number, maxValue: number) => {
    const showPressSet = minValue >= 0 && minValue < maxValue

    if (showPressSet) {
      handleDisplayMessageChange(`enter values and press 'set'`)
      setIsDisabled(false)
    } else {
      handleDisplayMessageChange('Incorrect value!')
      setIsDisabled(true)
    }
  }

  const onClickHandler = () => {
    if (minCount >= 0 && minCount < maxCount) {
      dispatch(applyCounterSettingsAC({ minCount, maxCount }))
      dispatch(setCountToMinAC({ minCount }))
      handleDisplayMessageChange(null)
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
