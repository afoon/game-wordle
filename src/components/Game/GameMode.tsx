import { useState, type SyntheticEvent, memo, useContext } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import z from "zod"
import { toast } from "sonner"
import GameBoard from "./GameBoard";
import type { GameRulesType } from "@/types/gameboardTypes"
import { validInput, guessSchema } from "@/utils"
import { GAME_STATUS } from "@/constants"
import { AnswerContext } from "@/contexts/"


const GameMode = ({gameMode }: { gameMode: () => GameRulesType }) => {
    const {answer} = useContext(AnswerContext)
    const [guess, setGuess] = useState('')
    const {gameBoard, gameStatus, updateGameBoard, submitGameBoard, resetGameboard} = gameMode()

    const gameOver = gameStatus === GAME_STATUS.FINISHED

    const onGuessUpdate = (value: string) => {
        if (!validInput.safeParse(value).success) { return }
        setGuess(value);
        updateGameBoard(value);
    }
    const submitGuess = () => {
        submitGameBoard(guess, answer);
        setGuess('')
    }
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            guessSchema.parse(guess);
            submitGuess();
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                toast(error.issues[0].message)
            }
        }

    }
    return (
        <div>
            <GameBoard gameBoard={gameBoard} />
            <form className="grid max-w-lg gap-2 my-4" onSubmit={onSubmit}>
                <Label htmlFor="guess">Enter guess:</Label>
                <div className="flex w-full gap-2 items-center">
                    <Input id="guess" value={guess} disabled={gameOver} aria-disabled={gameOver} onChange={e => onGuessUpdate(e.target.value.toUpperCase())} />
                    <Button type="submit" disabled={gameOver} aria-disabled={gameOver}>Enter</Button>
                </div>
            </form>
            {gameStatus === GAME_STATUS.FINISHED && <Button onClick={resetGameboard}> Play again ? </Button>}
        </div>)
}

export default memo(GameMode);