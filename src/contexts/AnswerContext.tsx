import { useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
import { WORD_LIST_URL } from '../constants'
import { chooseRandomWord, encode } from "@/utils";
import { AnswerContext } from "@/contexts";


export const AnswerProvider = ({children}:{children: ReactNode}) => {
  const [answer, setAnswer] = useState('');
  const [wordList, setWordList] = useState('');
  const resetWord = useCallback(() => {
    const randomWord = chooseRandomWord(wordList);
    setAnswer(randomWord);
  }, [wordList])
  useEffect(() => {
    async function getWord() {
      try {
        const response = await fetch(WORD_LIST_URL);
        if (!response) {
          console.warn('Error fetching word list')
        }
        const wordListText = await response.text();
        const encodedList = encode(wordListText.toUpperCase())
        setWordList(encodedList);
        const randomWord = chooseRandomWord(encodedList);
        setAnswer(randomWord)
      }
      catch (error) {
        console.warn(error)
      }
    }
    getWord();
  }, [])
  const values = useMemo(() => {return {answer, resetWord}}, [answer, resetWord])
  return (
    <AnswerContext value={values}>
        {children}
    </AnswerContext>
  )
}