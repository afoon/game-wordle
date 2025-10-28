
import { GAME_MODE } from "@/constants"
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "../ui/select"
import { useGameMode } from "@/contexts"
import {memo} from 'react'

const GameModeSelect = () => {
  const {gameMode, updateGameMode} = useGameMode()
  const selectedValue: string = gameMode
    return (
    <Select value={gameMode} onValueChange={(value) => {
      updateGameMode(value)
      }
      }>
            <SelectTrigger>
              <SelectValue placeholder="Select a Game Mode">{selectedValue}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
            {
              Object.entries(GAME_MODE).map( ([key, mode]) => (<SelectItem key={`mode-${key}`} value={mode}>{mode}
                </SelectItem>))
            }
            </SelectContent>
          </Select>
            )
}
export default memo(GameModeSelect)