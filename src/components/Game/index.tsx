
import useNormalMode from "@/hooks/gameModes/useNormalMode"
import type { GameRulesType } from "@/types/gameboardTypes"
import useScaffoldMode from "@/hooks/gameModes/useScaffoldMode"
import { GAME_MODE } from "@/constants"
import GameMode from "./GameMode"
import { useGameMode } from "@/contexts/"


const Game = () => {
    const {gameMode} = useGameMode()
    const BaseGame = ({ mode }: { mode: () => GameRulesType}) => <GameMode gameMode={mode} />
    switch (gameMode) {
        case GAME_MODE.SCAFFOLD:
            return <BaseGame mode={useScaffoldMode} />
        default:
            return <BaseGame mode={useNormalMode} />
    }
}

export default Game;