import { useCallback, useEffect, useMemo, useRef } from "react"

interface UseSelectionConfig {
  ref: React.RefObject<HTMLElement>
  onSelect: (text: string | undefined) => void
}

type SelectionListener = (selection: Selection) => void

function makeUseSelection() {

  const listeners = new Set<SelectionListener>()

  const handleSelectionUpdated = debounce({
    fn: () => {
      const selection = window.getSelection()

      if (selection) {
        listeners.forEach(listener => {
          listener(selection)
        })
      }
    },
    debounceTime: 200
  })

  window.addEventListener('mousemove', handleSelectionUpdated)
  window.addEventListener('keyup', handleSelectionUpdated)

  function useSelection({ ref, onSelect }: UseSelectionConfig) {
    const onSelectRef = useRef<typeof onSelect>(onSelect)

    useEffect(() => {
      onSelectRef.current = onSelect
    }, [onSelect])

    useEffect(() => {
      const onSelectionUpdate: SelectionListener = (selection) => {
        const selectedText = selection?.toString()
        const anchorNode = selection?.anchorNode
        const focusNode = selection?.focusNode

        const isContainedByRef =
          ((anchorNode && ref.current?.contains?.(anchorNode)) ?? false)
          && ((focusNode && ref.current?.contains?.(focusNode)) ?? false)

        if (isContainedByRef) {
          onSelectRef.current(selectedText)
        }
      }

      listeners.add(onSelectionUpdate)

      return () => {
        listeners.delete(onSelectionUpdate)
      }
    }, [])
  }

  return useSelection
}

interface DebounceConfig<TArgs extends readonly any[]> {
  fn: (...args: TArgs) => void
  debounceTime: number
}

function debounce<TArgs extends readonly any[]>({
  fn,
  debounceTime,
}: DebounceConfig<TArgs>) {
  const cache: {
    args: TArgs | null
    timeoutId: number | null
  } = {
    args: null,
    timeoutId: null,
  }

  function wrappedFn(...args: TArgs) {
    if (cache.timeoutId === null) {
      fn(...args)
      cache.args = null

      cache.timeoutId = window.setTimeout(() => {
        if (cache.args) {
          fn(...cache.args)
        }
  
        cache.args = null
        cache.timeoutId = null
      }, debounceTime)
    } else {
      cache.args = args
    }
  }

  return wrappedFn
}

export const useSelection = makeUseSelection()
