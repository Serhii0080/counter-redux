import buttonStyles from './Button.module.css'

export type ButtonType = {
  title: string
  onClick: () => void
  className?: string
  disabled?: boolean
}

export const Button = ({ title, onClick, className, disabled }: ButtonType) => {
  return (
    <button
      disabled={disabled}
      className={className ? `${buttonStyles.button} ${className}` : buttonStyles.button}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
