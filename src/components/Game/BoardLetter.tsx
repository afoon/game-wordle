import type { Letter as LetterType, LetterStatusType } from "@/types/gameboardTypes"
import { LETTER_STATUS } from "@/constants"
import {memo} from "react"

const letterColorMap: { [key in LetterStatusType]: string } = {
    [LETTER_STATUS.empty]: `border-2 border-neutral`,
    [LETTER_STATUS.correct]: `bg-green-600 text-white`,
    [LETTER_STATUS.mismatch]: `bg-amber-400 text-white`,
    [LETTER_STATUS.inProgress]: `border-3 border-neutral-600 font-bold text-center`,
    [LETTER_STATUS.incorrect]: `bg-neutral-600 text-white`
}
const baseClasses = "flex justify-center items-center text-2xl font-bold w-15 h-15"

const Letter = ({ letter }: { letter: LetterType }) => {
    const { status, letter: currentLetter } = letter;
    const classNames = `${baseClasses} ${letterColorMap[status]}`
    return <span className={classNames}>{currentLetter}</span>
}

export default memo(Letter);