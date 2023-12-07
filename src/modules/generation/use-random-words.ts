import { useEffect, useState } from 'react'

export interface UseRandomWordsConfig {
  count: {
    average: number
    variance?: number
  }
}

const BASE_WORDS = [
  'hello',
  'world',
  'my',
  'name',
  'is',
  'Ambiguous',
  'but',
  'you',
  'can',
  'call',
  'me',
  'Ambi',
  'I',
  'am',
  'generated',
  'nonsense',
  'but',
  'I\'m',
  'here',
  'to',
  'help',
  ':)'
]

export function useRandomWords({ count }: UseRandomWordsConfig) {
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    const variance = count.variance ?? 0
    const wordCount = Math.round(count.average + ((Math.random() - 0.5) * variance) )
    const startIndex = Math.round(Math.random() * BASE_WORDS.length)
    const offsets = [...new Array(wordCount)].map((v, i) => i + startIndex)
    const words = offsets.reduce((words, offset) => [...words, BASE_WORDS[offset % BASE_WORDS.length]], [] as string[])

    setWords(words)
  }, [count.average, count.variance])

  return {
    words,
  }
}