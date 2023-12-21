import { useEffect, useState } from "react"

export interface StylizedTextAPI {
  setStyle: (style: object) => void
}

export interface StylizedTextProps {
  children: string
  apiRef: React.MutableRefObject<StylizedTextAPI[]>
  apiIndex: number
}

export function StylizedText({ children, apiRef, apiIndex }: StylizedTextProps) {

  const [style, setStyle] = useState<object>({})
  
  useEffect(() => {
    apiRef.current[apiIndex] = {
      setStyle,
    }

    // console.log('[ s t ]', { current: apiRef.current})

    return () => {
      delete apiRef.current[apiIndex]
    }
  }, [])

  return (
    <span style={style}>{children}</span>
  )
}
