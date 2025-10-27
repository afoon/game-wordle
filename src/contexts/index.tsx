import { GAME_MODE } from "@/constants"
import { createContext, useContext } from "react"

export const AnswerContext = createContext({
    answer: '',
    resetWord: () => {},
})

export const KeyboardContext = createContext({
    keyHighlight: true,
    toggleHighlight: () => {}
})
export const useKeyboard = () => {
const context = useContext(KeyboardContext)
    if(context === undefined){
        throw new Error("useTheme used without Provider")
    }
    return context
}

type GameMode = {
    gameMode: string,
    updateGameMode: (value: string) => void;
}
export const GameModeContext = createContext<GameMode>({
    gameMode: GAME_MODE.NORMAL,
    updateGameMode: () => {},
})

export const useGameMode = () => {
    const context = useContext(GameModeContext)
    if(context === undefined){
        throw new Error("useGameMode used without Provider")
    }
    return context
}

type theme = {
    theme: string;
    toggleTheme: () => void;
}
export const ThemeContext = createContext<theme>({
    theme: "system", 
    toggleTheme: () => null,
})
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(context === undefined){
        throw new Error("useTheme used without Provider")
    }
    return context
}