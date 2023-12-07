import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useSelection } from "../../hooks/use-selection"


const styles = {
  normal: {},
  highlight: {
    backgroundColor: 'darkgoldenrod',
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

export interface TextBoxProps {
  text: string
  highlightString?: string
  style?: object
  onSelect?: (text: string | undefined) => void
}

interface MatchReduction {
  startIndex: number
  nodeConfigs: AnyTextNodeConfig[]
}

export function TextBox({ text, style, onSelect = (() => {}), highlightString }: TextBoxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useSelection({
    ref,
    onSelect: onSelect,
  })

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

  const textContainer: React.ReactNode = useMemo(() => {
    const matches = highlightRegex ? [...text.matchAll(highlightRegex)] : []
    const { startIndex, nodeConfigs } = matches.reduce<MatchReduction>(
      ({ startIndex, nodeConfigs }, match, i) => {
        const matchIndex = (match as any)['index'] ?? 0
        const endIndex = matchIndex + match[0].length

        return {
          startIndex: endIndex,
          nodeConfigs: [
            ...nodeConfigs,
            {
              type: 'normal' as const,
              text: text.substring(startIndex, matchIndex),
            },
            {
              type: 'highlight' as const,
              text: text.substring(matchIndex, endIndex),
            },
          ],
        }
      },
      {
        startIndex: 0,
        nodeConfigs: [],
      }
    )

    const finalNodeConfigs = [
      ...nodeConfigs,
      {
        type: 'normal' as const,
        text: text.substring(startIndex, text.length),
      }
    ]

    return (
      <div>
        {finalNodeConfigs.map(({ type, text }, i) => (
          <span style={styles[type]} key={`${i}-${text}`}>{text}</span>
        ))}
      </div>
    )
  }, [text, highlightRegex])

  return (
    <div>
      <div style={style} ref={ref}>{textContainer}</div>
      {/* <div style={style} ref={ref}>{text}</div> */}
      {/* <div style={style}>{highlightString}</div> */}
      {/* <div style={style}>{textContainer}</div> */}
      {/* <div style={styles.highlight}>{highlightString}</div> */}
    </div>
  )
}
