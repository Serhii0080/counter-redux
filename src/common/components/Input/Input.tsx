import styles from './Input.module.css'
import { ChangeEvent } from 'react'

type InputType = {
  id: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className: string
}

export const Input = ({ id, value, onChange, className }: InputType) => {
  return <input onChange={onChange} value={value} id={id} className={`${className || styles.input}`} type={'number'} />
}
