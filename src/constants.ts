export const WORD_LIST_URL =
  "https://gist.githubusercontent.com/scholtes/94f3c0303ba6a7768b47583aff36654d/raw/73f890e1680f3fa21577fef3d1f06b8d6c6ae318/wordle-La.txt";

export const MAX_GUESSES_ALLOWED = 6;

export const LETTER_STATUS = {
  incorrect: "incorrect",
  mismatch: "mismatch",
  correct: "correct",
  inProgress: "inProgress",
  empty: "empty",
} as const;

export const  GAME_MODE = {
    NORMAL: 'Normal',
    // HARD: 'Hard',
    // WILDCARD: 'Wildcard',
    LADDER: 'Ladder',
}

export const GAME_STATUS = {
    FINISHED: 'FINISHED',
    ACTIVE: "ACTIVE",
    CONTINUE: "CONTINUE",
    RESET: "RESET"
}
