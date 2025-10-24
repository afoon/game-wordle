import type { GameBoardType, Letter, LetterStatusType } from "./types";

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
export const chooseRandomWord = (wordList: string[]): string => {
  const maxChoices = wordList.length + 1;
  const index = Math.floor(Math.random() * maxChoices);
  return wordList[index];
};
export const formatTypedGuess = (value: string, status: LetterStatusType) => {
  const letters = value.split("");
  return Array.from(Array(5), (_, index) => {
    return {
      id: index + 1,
      letter: letters[index] ?? "",
      status: letters[index] ? status : "empty",
    };
  });
};

export const checkGuess = (guess: string, answer: string): Letter[] => {
  const response: Letter[] = [];
  const answerLetters = answer.split("");
  for (let i = 0; i < 5; i++) {
    if (guess.charAt(i) === answer.charAt(i)) {
      answerLetters[i] = "";
      response[i] = {
        letter: guess.charAt(i),
        status: "correct",
      };
    }
  }
  for (let i = 0; i < 5; i++) {
    if (guess.charAt(i) === answer.charAt(i)) {
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
