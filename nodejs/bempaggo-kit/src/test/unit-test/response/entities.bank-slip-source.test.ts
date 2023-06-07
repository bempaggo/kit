import { BempaggoBankSlipSourceResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Slip", () => {

  describe("Response", () => {
    test("BempaggoBankSlipSource", async () => {
      const slip: BempaggoBankSlipSourceResponse = {
        kind: "BANK_SLIP",
        name: "Banco do Brasil",
      };

      expect(slip).not.toBeNull();
      expect(slip).not.toBeUndefined();
      expect(slip).not.toBeNaN();

      assertType<BempaggoBankSlipSourceResponse>(slip);

      expect(slip.kind).not.toBeNull();
      expect(slip.kind).not.toBeUndefined();
      expect(slip.kind).not.toBeNaN();
      expect(slip.kind).toBe("BANK_SLIP");

      expect(slip.name).not.toBeNull();
      expect(slip.name).not.toBeUndefined();
      expect(slip.name).not.toBeNaN();
      expect(slip.name).toBe("Banco do Brasil");

    });
  });
});
