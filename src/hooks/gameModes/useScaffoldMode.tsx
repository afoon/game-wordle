import { useContext, useState } from "react"
import { toast } from "sonner"
import { GAME_STATUS, MAX_GUESSES_ALLOWED } from "@/constants"
import { checkGuess, formatTypedGuess, makeGameBoard, decode, encode } from "@/utils"
import { type GameRulesType } from '@/types/gameboardTypes';
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
        const formattedGuess = [...formatTypedGuess(currentGuess)]
        const nextGameBoard = [...gameBoard]
        nextGameBoard[guessCount] = { id: `guess-${guessCount + 1}`, letters: formattedGuess };
        setGameboard(nextGameBoard);
        return;
    }

    const submitGameBoard = (guess: string, answer: string) => {
        if (guessCount < maxGuess) {
            const nextGameBoard = [...gameBoard]
            nextGameBoard[guessCount] = {
                id: `guess-${guessCount + 1}`,
                letters: checkGuess(guess, answer)
            }
            setGameboard(nextGameBoard);
            const nextCount = guessCount + 1;
            setTotalGuesses((prev) => prev + 1)
            if (encode(guess) === answer) {
                if (maxGuess === 1) {
                    toast.success('', {
                        duration: 8000,
                        description: () => <p>Congrats!<br/>You made it to end after ${totalGuesses} guesses.</p>,
                    })
                    setGameStatus(GAME_STATUS.FINISHED)
                    setMaxGuess(MAX_GUESSES_ALLOWED);
                    return;
                }
                const nextMaxGuess = maxGuess - 1
                setMaxGuess(nextMaxGuess);
                setGameStatus(GAME_STATUS.CONTINUE)
                toast.success("", {
                    description: () => <p className="text-nowrap">That was easy! Let's take a row away.</p>,
                    duration: Infinity,
                    action: {
                        label: 'Next game',
                        onClick: () => decrementGameboard()
                    },
                    actionButtonStyle: {backgroundColor: 'var(--color-green-600)'},

                })
                return;
            }
            if (nextCount === maxGuess) {
                setGameStatus(GAME_STATUS.CONTINUE)
                toast("", { 
                    duration: Infinity, 
                    description: () => <p className="text-nowrap">The word is <b>{decode(answer)}</b>.<br/>Maybe an extra row will help?</p>,                   
                    action: {
                        label: 'Next game',
                        onClick: () => incrementGameboard()
                    }})
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
        resetActiveGame()
        setMaxGuess(nextMaxGuess);
        setGameboard(makeGameBoard(nextMaxGuess))
        setGameStatus(GAME_STATUS.RESET);
    }
    const decrementGameboard = () => {
        const nextMaxGuess = maxGuess - 1
        resetActiveGame();
        setMaxGuess(nextMaxGuess);
        setGameboard(makeGameBoard(nextMaxGuess))
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