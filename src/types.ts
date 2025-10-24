import { LETTER_STATUS } from "./constants";

export type LetterStatusType = keyof typeof LETTER_STATUS;

export interface Letter {
  id?: number;
  letter: string;
  status: LetterStatusType;
}
export type WordGuess = {
  id: string;
  letters: Letter[];
};

export type GameBoardType = WordGuess[];
