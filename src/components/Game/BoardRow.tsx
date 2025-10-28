
import type { GuessType } from "@/types/gameboardTypes"
import Letter from "./BoardLetter"
import {memo} from "react"

const BoardRow = ({ guess }: {guess: GuessType }) => {
    const {letters} = guess

    return (
        <div className="flex gap-1">
            {letters.map( (letter, index) => 
            <Letter key={`${guess.id}-letter-${String(index)}`} letter={letter}/>
            )}
        </div>
    )
}

export default memo(BoardRow)