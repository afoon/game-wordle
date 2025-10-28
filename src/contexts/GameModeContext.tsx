import { useCallback, useMemo, type ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GameModeContext } from "./index";
import { GAME_MODE } from "@/constants";

export const GameModeProvider = ({ children }: { children: ReactNode }) => {
    const [gameMode, setMode] = useLocalStorage('gameMode', GAME_MODE.NORMAL)
    const updateGameMode = useCallback( (value: string) => {
        setMode(value)
    }, [setMode])

    const values = useMemo(() => {
        return {
                gameMode,
                updateGameMode,
        }
    }, [gameMode, updateGameMode])
    return (
        <GameModeContext value={values}>
            {children}
        </GameModeContext>
    )
}