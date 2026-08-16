type DisplayType = {
  title: string | number
  className: string
}

export const CounterDisplay = ({ title, className }: DisplayType) => {
  return <div className={className}>{title}</div>
}
