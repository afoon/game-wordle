
import {memo} from "react";
import type { KeyboardProps } from "@/types/keyboardTypes";
import KeyRow from "./KeyRow";
import Key from './Key'
import { DeleteIcon } from "lucide-react";

const topRow = 'qwertyuiop'.toUpperCase().split('')
const middleRow = 'asdfghjkl'.toUpperCase().split('')
const bottomRow = 'zxcvbnm'.toUpperCase().split('')

const Keyboard = (props: KeyboardProps) => {
    return (
        <div className="flex flex-col gap-1 p-4">
            <KeyRow  row={topRow}  {...props} />
            <KeyRow  row={middleRow} {...props} />
            <div className="flex gap-1"><Key letter="enter" {...props}/><KeyRow  row={bottomRow}  {...props}/><Key letter="backspace" icon={<DeleteIcon/>} {...props}/></div>
        </div>
    )
}

export default memo(Keyboard);