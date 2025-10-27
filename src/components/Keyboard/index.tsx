
import {memo} from "react";
import type { KeyboardProps } from "@/types/keyboardTypes";
import KeyRow from "./KeyRow";

const topRow = 'qwertyuiop'.toUpperCase().split('')
const middleRow = 'asdfghjkl'.toUpperCase().split('')
const bottomRow = 'zxcvbm'.toUpperCase().split('')

const Keyboard = (props: KeyboardProps) => {
    return (
        <div className="flex flex-col gap-1">
            <KeyRow  row={topRow}  {...props} />
            <KeyRow  row={middleRow} {...props} />
            <KeyRow  row={bottomRow}  {...props}/>
        </div>
    )
}

export default memo(Keyboard);