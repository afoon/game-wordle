import { encode, decode } from "@/utils";
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
});
