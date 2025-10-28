import { useContext, useState } from "react"
import { toast } from "sonner"
import { GAME_STATUS, MAX_GUESSES_ALLOWED } from "@/constants"
import { checkGuess, formatTypedGuess, makeGameBoard } from "@/utils"
import { type GameRulesType } from '@/types/gameboardTypes';
import { Button } from "@/components/ui/button";
import { AnswerContext } from "@/contexts/";

const useScaffoldMode = (): GameRulesType => {
    const [gameBoard, setGameboard] = useState(makeGameBoard(MAX_GUESSES_ALLOWED))
    const [maxGuess, setMaxGuess] = useState(MAX_GUESSES_ALLOWED);
    const [totalGuesses, setTotalGuesses] = useState(0)
    const [guessCount, setGuessCount] = useState(0);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.ACTIVE);
    const { resetWord } = useContext(AnswerContext);

    const updateGameBoard = (currentGuess: string) => {
        if (gameStatus === GAME_STATUS.CONTINUE) { setGameStatus(GAME_STATUS.ACTIVE) }
        const formattedGuess = [...formatTypedGuess(currentGuess, 'inProgress')]
        const nextGameBoard = [...gameBoard]
        nextGameBoard[guessCount] = { id: `guess-${guessCount + 1}`, letters: formattedGuess };
        setGameboard(nextGameBoard);
        return;
    }

    const submitGameBoard = (guess: string, answer: string) => {
        if (guessCount < MAX_GUESSES_ALLOWED) {
            const nextGameBoard = [...gameBoard]
            nextGameBoard[guessCount] = {
                id: `guess-${guessCount + 1}`,
                letters: checkGuess(guess, answer)
            }
            setGameboard(nextGameBoard);
            const nextCount = guessCount + 1;
            setTotalGuesses((prev) => prev + 1)
            if (btoa(guess) === answer) {
                if (maxGuess === 1) {
                    toast.success(`Congrats! You climbed the top of the ladder in ${totalGuesses} guesses.`, {
                        duration: 8000,
                    })
                    setGameStatus(GAME_STATUS.FINISHED)
                    setMaxGuess(MAX_GUESSES_ALLOWED);
                    return;
                }
                const nextMaxGuess = maxGuess - 1
                setMaxGuess(nextMaxGuess);
                setGameStatus(GAME_STATUS.CONTINUE)
                toast.success("That was easy.\n Let's take away a guess", {
                    duration: Infinity,
                    action: <Button className="bg-green-700 hover:bg-green-400" onClick={() => decrementGameboard()}>Next game</Button>

                })
                return;
            }
            if (nextCount === MAX_GUESSES_ALLOWED) {
                toast(`The word was ${atob(answer)}. Here's an extra guess for the next game`, { duration: Infinity, action: <Button onClick={() => incrementGameboard()}>Start next game</Button> })
                return;
            }
            setGuessCount(nextCount);
        }

    }

    const resetActiveGame = () => {
        resetWord();
        setGuessCount(0);
        toast.dismiss()
    }
    const incrementGameboard = () => {
        const nextMaxGuess = maxGuess + 1
        setMaxGuess(nextMaxGuess);
        setGameboard(makeGameBoard(nextMaxGuess))
        resetActiveGame()
        setGameStatus(GAME_STATUS.RESET);
    }
    const decrementGameboard = () => {
        const nextMaxGuess = maxGuess - 1
        setMaxGuess(nextMaxGuess);
        setGameboard(makeGameBoard(nextMaxGuess))
        resetActiveGame();
        setGameStatus(GAME_STATUS.RESET);

    }
    const resetGameboard = () => {
        resetActiveGame()
        setGameStatus(GAME_STATUS.ACTIVE);
        setGameboard(makeGameBoard(maxGuess))
    }
    return { updateGameBoard, submitGameBoard, resetGameboard, gameBoard, gameStatus }
}
export default useScaffoldMode