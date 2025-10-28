import { useState, type SyntheticEvent, memo, useContext, useEffect } from "react"
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
import Keyboard from "@/components/Keyboard"
import useLetterStatus from "@/hooks/useLetterStatus"

const GameMode = ({ gameMode }: { gameMode: () => GameRulesType }) => {
    const { answer } = useContext(AnswerContext)
    const [guess, setGuess] = useState('')
    const [submittedGuess, setSubmittedGuess] = useState(['']);
    const { gameBoard, gameStatus, updateGameBoard, submitGameBoard, resetGameboard } = gameMode()
    const {updateUsedLetters, usedLetters, resetKeyboard } = useLetterStatus();

    const gameOver = gameStatus !== GAME_STATUS.ACTIVE && gameStatus !== GAME_STATUS.RESET

    useEffect(() => {
        if(gameStatus === GAME_STATUS.RESET){
            resetKeyboard();
        }
    }, [gameStatus, resetKeyboard])

    const onGuessUpdate = (value: string) => {
        if (!validInput.safeParse(value).success) { return }
        setGuess(value);
        updateGameBoard(value);
    }
    const submitGuess = () => {
        submitGameBoard(guess, answer);
        const nextSumbittedGuessList = [...submittedGuess, guess]
        setSubmittedGuess(nextSumbittedGuessList);
        updateUsedLetters(guess, answer);
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
    const onReset = () => {
        resetGameboard();
        setSubmittedGuess([''])
        resetKeyboard();
    }

    const onKeyPress = (value: string) => {
        if(gameOver){return}
        const nextValue = guess + value;
        if (!validInput.safeParse(nextValue).success) { return }
        setGuess(nextValue);
        updateGameBoard(nextValue);
    }
    return (
        <div className="flex flex-col gap-4">
            <GameBoard gameBoard={gameBoard} />
            {gameStatus === GAME_STATUS.FINISHED && <Button onClick={onReset} className="self-center"> Play again ? </Button>}
            <form className="grid gap-2 my-4" onSubmit={onSubmit}>
                <Label htmlFor="guess">Enter guess:</Label>
                <div className="flex w-full gap-2 items-center">
                    <Input id="guess" value={guess} disabled={gameOver} aria-disabled={gameOver} onChange={e => onGuessUpdate(e.target.value.toUpperCase())} />
                    <Button type="submit" disabled={gameOver} aria-disabled={gameOver}>Enter</Button>
                </div>
            </form>
            <Keyboard usedLetters={usedLetters} onKeyPress={onKeyPress} />
        </div>)
}

export default memo(GameMode);