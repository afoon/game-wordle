import { useState, type SyntheticEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import z from "zod"
import { toast } from "sonner"
import { MAX_GUESSES_ALLOWED } from "@/constants"
import GameBoard from "./GameBoard";
import { checkGuess, formatTypedGuess, makeGameBoard } from "@/utils"

const guessSchema = z.string().min(5, "Not enough letters");
const validInput = z.string().max(5).regex(/^[A-Z]*$/)
const Game = ({ answer }: { answer: string }) => {
    const [guess, setGuess] = useState('')
    const [gameBoard, setGameboard] = useState(makeGameBoard(MAX_GUESSES_ALLOWED))
    const [guessCount, setGuessCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const onGuessUpdate = (value: string) => {
        if (!validInput.safeParse(value).success) { return }
        setGuess(value);
        updateGameBoard(value);
    }
    const updateGameBoard = (currentGuess: string) => {
        const formattedGuess = [...formatTypedGuess(currentGuess, 'inProgress')]
        const nextGameBoard = [...gameBoard]
        nextGameBoard[guessCount] = { id: `guess-${guessCount}`, letters: formattedGuess };
        setGameboard(nextGameBoard);
    }
    const submitGuess = () => {
        if (guessCount < MAX_GUESSES_ALLOWED) {
            const nextGameBoard = [...gameBoard]
            nextGameBoard[guessCount] = {
                id: `guess-${guessCount}`,
                letters: checkGuess(guess, answer)
            }
            setGameboard(nextGameBoard);
            setGuess('');
            const nextCount = guessCount + 1;
            if (guess === answer) {
                toast.success(`Congrats. You got in ${nextCount} ${nextCount > 1 ? "guesses" : "guess"}`, {
                    duration: 8000,
                })
                setGameOver(true)
                return;
            }
            if (nextCount === MAX_GUESSES_ALLOWED) {
                toast(answer, { duration: Infinity })
                setGameOver(true);
                return;
            }
            setGuessCount(nextCount);
        }
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
        </div>)
}

export default Game;