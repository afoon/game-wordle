import {memo, useContext, type ReactNode} from "react";
import type { usedLetterType } from "@/types/keyboardTypes";
import { KeyboardContext } from "@/contexts";

const Key = ({ letter, usedLetters, onKeyDown, icon }: { letter: string, usedLetters:usedLetterType, icon?:ReactNode, onKeyDown: (value: string) => void} ) => {
    let color = 'bg-neutral-200 dark:bg-muted-foreground';
    const {keyHighlight} = useContext(KeyboardContext)
    if(keyHighlight){
        if (usedLetters?.correct?.has(letter)){
            color = 'bg-green-600 text-white';
        }
        if (usedLetters?.mismatch?.has(letter)){
            color = 'bg-amber-400 text-white';
        }
        if (usedLetters?.used?.has(letter)){
            color = 'bg-neutral-700 text-white';
        }
    }

    return(
    <button onClick={() => onKeyDown(letter)}className={`${color} font-bold py-4 px-2.5 sm:px-4 sm:py-5 rounded cursor-pointer`}>
        {icon ? icon : letter.toUpperCase()}
    </button>
)}

export default memo(Key)