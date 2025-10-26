import { createContext } from "react"

export const AnswerContext = createContext({
    answer: '',
    resetWord: () => {},
})