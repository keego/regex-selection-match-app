import { useCallback } from "react"

export interface ButtonProps {
  children: string
  disabled?: boolean
  style?: object
  onClick?: () => void
}

export function Button({ children, disabled = false, onClick, style }: ButtonProps) {
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement> >(() => {
    onClick?.()
  }, [onClick])

  return (
    <button disabled={disabled} onClick={handleClick} style={style}>{children}</button>
  )
}