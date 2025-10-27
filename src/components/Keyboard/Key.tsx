import {memo, useContext} from "react";
import type { usedLetterType } from "@/types/keyboardTypes";
import { KeyboardContext } from "@/contexts";

const Key = ({ letter, usedLetters, onKeyPress }: { letter: string, usedLetters:usedLetterType, onKeyPress: (value: string) => void } ) => {
    let color = 'bg-neutral-200 dark:bg-neutral-500';
    const {keyHighlight} = useContext(KeyboardContext)
    if(keyHighlight){
        if (usedLetters?.correct?.has(letter)){
            color = 'bg-green-500 text-white';
        }
        if (usedLetters?.mismatch?.has(letter)){
            color = 'bg-amber-400 text-white';
        }
        if (usedLetters?.used?.has(letter)){
            color = 'bg-neutral-700 text-white';
        }
    }

    return(
    <button onClick={() => onKeyPress(letter)}className={`${color} font-bold p-4 cursor-pointer`}>
        {letter.toUpperCase()}
    </button>
)}

export default memo(Key)