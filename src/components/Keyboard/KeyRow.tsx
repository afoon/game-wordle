import {memo} from "react";
import type { KeyboardProps } from "@/types/keyboardTypes";
import Key from "./Key";

const KeyRow = (props: KeyboardProps) => { 
    const {row} = props;
    return(
    <div className="flex gap-1 justify-center">
        {row?.map( (letter: string) => <Key letter={letter} key={letter} {...props}/>)}
    </div>
)}

export default memo(KeyRow)