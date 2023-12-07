import { useCallback, useMemo, useState } from "react";
import { TextBox } from "../text-box";
import { useRandomWords } from "../../modules/generation";
import { Button } from "../button";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  text: {
    fontSize: 'x-large',
    padding: '1em',
  },
  box: {
    margin: '6px',
    width: 'calc(100vw - 60px)',
    height: '100px',
    fontSize: 'xx-large',
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

export interface HighlightBoxesProps {}

export function HighlightBoxes({}: HighlightBoxesProps) {
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
    <div style={styles.container}>
      <TextBox style={styles.box} text={baseText} onSelect={onSelect} />
      {/* <TextBox style={styles.box} text={highlightedText} /> */}
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
  )
}