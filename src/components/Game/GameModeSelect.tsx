
import { GAME_MODE } from "@/constants"
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent, SelectLabel } from "../ui/select"
import { SelectGroup } from "@radix-ui/react-select"
import type { GameModeType } from "@/types/gameboardTypes"


const GameModeSelect = ({gameMode, setGameMode} : {gameMode: GameModeType, setGameMode: () => void; }) => {
    return (
    <Select value={gameMode} onValueChange={setGameMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Game Mode">{GAME_MODE[gameMode]}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectLabel>Game Modes</SelectLabel>
            {
              Object.entries(GAME_MODE).map( ([key, mode]) => (<SelectItem key={`mode-${key}`} value={mode}>{mode}
                </SelectItem>))
            }
            </SelectGroup>
            </SelectContent>
          </Select>
            )
}
export default GameModeSelect