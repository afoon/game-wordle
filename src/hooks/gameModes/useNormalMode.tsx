import { useState, useContext } from "react"
import { toast } from "sonner"
import { GAME_STATUS, MAX_GUESSES_ALLOWED } from "@/constants"
import { checkGuess, formatTypedGuess, makeGameBoard } from "@/utils"
import {type GameRulesType} from '@/types/gameboardTypes';
import { AnswerContext } from "@/contexts";


const useNormalMode = () : GameRulesType => {
    const [gameBoard, setGameboard] = useState(makeGameBoard(MAX_GUESSES_ALLOWED))
    const [guessCount, setGuessCount] = useState(0);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.ACTIVE);
    const { resetWord } = useContext(AnswerContext);

    const updateGameBoard = (currentGuess: string) => {
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
                id: `guess-${guessCount}`,
                letters: checkGuess(guess, answer)
            }
            setGameboard(nextGameBoard);
            const nextCount = guessCount + 1;
            if (guess === answer) {
                toast.success(`Congrats. You got in ${nextCount} ${nextCount > 1 ? "guesses" : "guess"}`, {
                    duration: 8000,
                })
                setGameStatus(GAME_STATUS.FINISHED)
                return;
            }
            if (nextCount === MAX_GUESSES_ALLOWED) {
                toast(answer, { duration: Infinity })
                setGameStatus(GAME_STATUS.FINISHED);
                return;
            }
            setGuessCount(nextCount);
        }

    }
    const resetGameboard = () => {
        setGameStatus(GAME_STATUS.ACTIVE);
        setGuessCount(0);
        setGameboard(makeGameBoard(MAX_GUESSES_ALLOWED))
        resetWord();
        toast.dismiss();
    }
    return { updateGameBoard, submitGameBoard, resetGameboard, gameBoard, gameStatus }
}
export default useNormalMode