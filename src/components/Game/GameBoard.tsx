
import type {  GameBoardType, } from "@/types/gameboardTypes"
import {memo} from "react"
import BoardRow from "./BoardRow"


const GameBoard = ({ gameBoard }: { gameBoard: GameBoardType }) => {
    return (<div className="flex flex-col gap-1 items-center">
        {gameBoard.map( guess => 
            <BoardRow key={guess.id} guess={guess}/>
        )}
    </div>)
}

export default memo(GameBoard)