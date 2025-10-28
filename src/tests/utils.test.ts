import { encode, decode, formatTypedGuess, checkGuess } from "@/utils";
import { describe, expect, it } from "vitest";

const TEST_ENCODED_STRING = "dGVzdFN0cmluZw==";
const TEST_DECODED_STRING = "testString";

describe("utils test", () => {
  describe("encode / decode string", () => {
    it("encodes strings", () => {
      expect(encode(TEST_DECODED_STRING)).toBe(TEST_ENCODED_STRING);
    });
    it("decodes strings", () => {
      expect(decode(TEST_ENCODED_STRING)).toBe(TEST_DECODED_STRING);
    });
  });
  describe("checkGuess()", () => {
    const TEST_ANSWER = btoa("SMALL");
    const TEST_GUESSES = ["CHEER", "LLAMA", "SMALL"];
    it("applies the correct statuses", () => {
      expect(checkGuess(TEST_GUESSES[0], TEST_ANSWER)).toEqual([
        {
          letter: "C",
          status: "incorrect",
        },
        {
          letter: "H",
          status: "incorrect",
        },
        {
          letter: "E",
          status: "incorrect",
        },
        {
          letter: "E",
          status: "incorrect",
        },
        {
          letter: "R",
          status: "incorrect",
        },
      ]);
      expect(checkGuess(TEST_GUESSES[1], TEST_ANSWER)).toEqual([
        {
          letter: "L",
          status: "mismatch",
        },
        {
          letter: "L",
          status: "mismatch",
        },
        {
          letter: "A",
          status: "correct",
        },
        {
          letter: "M",
          status: "mismatch",
        },
        {
          letter: "A",
          status: "incorrect",
        },
      ]);
            expect(checkGuess(TEST_GUESSES[2], TEST_ANSWER)).toEqual([
        {
          letter: "S",
          status: "correct",
        },
        {
          letter: "M",
          status: "correct",
        },
        {
          letter: "A",
          status: "correct",
        },
        {
          letter: "L",
          status: "correct",
        },
        {
          letter: "L",
          status: "correct",
        },
      ]);
    });
  });
  describe("formatTypedGuess()", () => {
    it("formats in progress guess", () => {
      const guess1 = "SMA";
      expect(formatTypedGuess(guess1)).toEqual([
        {
          id: 1,
          letter: "S",
          status: "inProgress",
        },
        {
          id: 2,
          letter: "M",
          status: "inProgress",
        },
        {
          id: 3,
          letter: "A",
          status: "inProgress",
        },
        {
          id: 4,
          letter: "",
          status: "empty",
        },
        {
          id: 5,
          letter: "",
          status: "empty",
        },
      ]);
      const guess2 = "SMART";
      expect(formatTypedGuess(guess2)).toEqual([
        {
          id: 1,
          letter: "S",
          status: "inProgress",
        },
        {
          id: 2,
          letter: "M",
          status: "inProgress",
        },
        {
          id: 3,
          letter: "A",
          status: "inProgress",
        },
        {
          id: 4,
          letter: "R",
          status: "inProgress",
        },
        {
          id: 5,
          letter: "T",
          status: "inProgress",
        },
      ]);
    });
    it("only formats guess up to 5 letters", () => {
      const guess3 = "SMARTYPANTS";
      expect(formatTypedGuess(guess3)).toEqual([
        {
          id: 1,
          letter: "S",
          status: "inProgress",
        },
        {
          id: 2,
          letter: "M",
          status: "inProgress",
        },
        {
          id: 3,
          letter: "A",
          status: "inProgress",
        },
        {
          id: 4,
          letter: "R",
          status: "inProgress",
        },
        {
          id: 5,
          letter: "T",
          status: "inProgress",
        },
      ]);
    });
  });
});
