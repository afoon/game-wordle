import type { GameBoardType, Letter } from "./types/gameboardTypes";
import z from "zod";

export const getRandomValue = (max: number, min: number = 0 ) => Math.floor(Math.random() * (max - min + 1))

export const makeGameBoard = (maxGuesses: number): GameBoardType => {
  const board = new Array(maxGuesses);
  for (let i = 0; i < board.length; i++) {
    board[i] = {
      id: `guess-${i + 1}`,
      letters: new Array(5).fill({
        letter: "",
        status: "empty",
      }),
    };
  }
  return board;
};

export const decode = (str: Base64URLString): string => {
  return atob(str)
}
export const encode = (str: string): Base64URLString => {
  return btoa(str)
}
export const chooseRandomWord = (encodedList: string): string => {
  const decodelist = decode(encodedList);
  const wordList = decodelist.split('\n')
  const index = getRandomValue(wordList.length)
  const randomWord = wordList[index]
  return encode(randomWord);
};
export const formatTypedGuess = (value: string): Letter[] => {
  const letters = value.split("");
  return Array.from(Array(5), (_, index) => {
    return {
      id: index + 1,
      letter: letters[index] ?? "",
      status: letters[index] ? 'inProgress' : "empty",
    };
  });
};

export const checkGuess = (guess: string, answer: string): Letter[] => {
  const response: Letter[] = [];
  const answerLetters = decode(answer).split("");
  for (let i = 0; i < 5; i++) {
    if (guess.charAt(i) === decode(answer).charAt(i)) {
      answerLetters[i] = "";
      response[i] = {
        letter: guess.charAt(i),
        status: "correct",
      };
    }
  }
  for (let i = 0; i < 5; i++) {
    if (guess.charAt(i) === decode(answer).charAt(i)) {
      continue;
    }
    if (answerLetters.includes(guess.charAt(i))) {
      const charIdx = answerLetters.indexOf(guess.charAt(i));
      answerLetters[charIdx] = "";
      response[i] = {
        letter: guess.charAt(i),
        status: "mismatch",
      };
    } else {
      response[i] = {
        letter: guess.charAt(i),
        status: "incorrect",
      };
    }
  }
  return response;
};

export const guessSchema = z.string().min(5, "Not enough letters");
export const validInput = z.string().max(5).regex(/^[A-Z]*$/)
