import { useCallback, useMemo, useState } from "react";

import { TextBox } from "~components/text-box";
import { Button } from "~components/button";
import { useRandomWords } from "~modules/generation";
import { PageLayout } from "~layouts/page-layout";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  text: {
    padding: '1em',
  },
  box: {
    margin: '6px',
    width: 'calc(100vw - 60px)',
    height: '100px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-around',
    alignItems: 'baseline',
    width: '8em',
  },
  button: {
    fontSize: 'x-large',
    padding: '0.5em',
  }
}

export interface HighlighterPageV1Props {}

export function HighlighterPageV1({}: HighlighterPageV1Props) {
  const { words } = useRandomWords({ count: { average: 30 } })
  const [highlightedText, setHighlightedText] = useState<string | undefined>(undefined)
  const [isSelecting, setIsSelecting] = useState(false)

  const onStart = useCallback(() => {
    setIsSelecting(true)
  }, [])
  const onStop = useCallback(() => {
    setIsSelecting(false)
  }, [])

  const onSelect = useCallback((text: string | undefined) => {
    if (isSelecting) {
      setHighlightedText(text)
    }
  }, [isSelecting])

  const baseText = useMemo(() => words.join(' '), [words])

  return (
    <PageLayout>
      <div style={styles.container}>
        <TextBox style={styles.box} text={baseText} onSelect={onSelect} />
        <div style={styles.text}>Highlight some text above</div>
        <div style={styles.row}>
          <Button style={styles.button} disabled={isSelecting} onClick={onStart}>
            Start
          </Button>
          <Button style={styles.button} disabled={!isSelecting} onClick={onStop}>
            Stop
          </Button>
        </div>
        <div style={styles.text}>Selection highlighted below</div>
        <TextBox style={styles.box} text={baseText} highlightString={highlightedText} />
        <TextBox style={styles.box} text={highlightedText ?? ''} />
      </div>
    </PageLayout>
  )
}