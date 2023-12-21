import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useSelection } from "../../hooks/use-selection"
import { StylizedText, StylizedTextAPI } from "./stylized-text"


const styles = {
  normal: {
    borderBottom: '2px solid transparent',
  },
  highlight: {
    borderBottom: '2px solid yellow',
  }
}

type AnyTextNodeConfig =
  | {
    type: 'normal'
    text: string
  }
  | {
    type: 'highlight'
    text: string
  }

export interface TextBoxV2Props {
  text: string
  highlightString?: string
  style?: object
  onSelect?: (text: string | undefined) => void
}

export function TextBoxV2({ text, style, onSelect = (() => {}), highlightString }: TextBoxV2Props) {
  const ref = useRef<HTMLDivElement>(null)

  useSelection({
    ref,
    onSelect: onSelect,
  })

  const { textContainer } = useParceledTextContainer({
    text,
    highlightString,
  })

  return (
    <div>
      <div style={style} ref={ref}>{textContainer}</div>
    </div>
  )
}

interface UseParceledTextContainerConfig {
  text: string
  highlightString?: string
}

interface MatchReduction {
  startIndex: number
  nodeConfigs: AnyTextNodeConfig[]
}

function useParceledTextContainer({
  text,
  highlightString,
}: UseParceledTextContainerConfig) {

  const stylizedTextApisRef = useRef<StylizedTextAPI[]>([])

  const textContainer: React.ReactNode = useMemo(() => {
    return (
      <div>
        {text.split('').map((char, charIndex) => (
          <StylizedText
            key={`${charIndex}`}
            apiRef={stylizedTextApisRef}
            apiIndex={charIndex}
          >{char}</StylizedText>
        ))}
      </div>
    )
  }, [text])

  const highlightRegex = useMemo(
    () => {
      if (highlightString && highlightString.length > 0) {
        const escapedString = highlightString.replace(/([^a-zA-Z0-9])/g, "\\$1")
        return new RegExp(escapedString, 'g')
      } else {
        return null
      }
    },
    [highlightString]
  )

  const { nodeStyles } = useMemo(() => {
    const matches = highlightRegex ? [...text.matchAll(highlightRegex)] : []
    const { startIndex, nodeConfigs } = matches.reduce<MatchReduction>(
      ({ startIndex, nodeConfigs }, match, i) => {
        const matchIndex = (match as any)['index'] ?? 0
        const endIndex = matchIndex + match[0].length

        const normalNodes = text.substring(startIndex, matchIndex).split('').map(
          (char) => ({
            type: 'normal' as const,
            text: char,
          })
        )

        const highlightNodes = text.substring(matchIndex, endIndex).split('').map(
          (char) => ({
            type: 'highlight' as const,
            text: char,
          })
        )

        return {
          startIndex: endIndex,
          nodeConfigs: [
            ...nodeConfigs,
            ...normalNodes,
            ...highlightNodes,
          ],
        }
      },
      {
        startIndex: 0,
        nodeConfigs: [],
      }
    )

    const finalNormalNodes = text.substring(startIndex, text.length).split('').map(
      (char) => ({
        type: 'normal' as const,
        text: char,
      })
    )

    const finalNodeConfigs = [
      ...nodeConfigs,
      ...finalNormalNodes,
    ]

    return {
      nodeStyles: finalNodeConfigs,
    }
  }, [text, highlightRegex])

  useEffect(() => {
    const renderString = nodeStyles.reduce((renderString, nodeStyle) => {
      switch (nodeStyle.type) {
        case 'normal': return renderString + nodeStyle.text.toLowerCase()
        case 'highlight': return renderString + nodeStyle.text.toUpperCase()
      }
    }, '')

    nodeStyles.forEach((style, index) => {
      stylizedTextApisRef.current[index].setStyle(styles[style.type])
    })

  }, [textContainer, nodeStyles])

  return {
    textContainer,
  }
}
