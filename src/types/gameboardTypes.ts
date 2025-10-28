import { LETTER_STATUS, GAME_MODE, GAME_STATUS } from "../constants";

export type LetterStatusType = keyof typeof LETTER_STATUS;
export type GameModeType = keyof typeof GAME_MODE;
export type GameStatusType = keyof typeof GAME_STATUS

export interface Letter {
  id?: number;
  letter: string;
  status: LetterStatusType;
}
export type GuessType = {
  id: string;
  letters: Letter[];
};

export type GameBoardType = GuessType[];

export interface GameRulesType {
    gameBoard: GameBoardType;
    gameStatus: string;
    submitGameBoard: (guess: string, answer: string) => void;
    updateGameBoard: (currentGuess: string) => void;
    resetGameboard: () => void;
}
