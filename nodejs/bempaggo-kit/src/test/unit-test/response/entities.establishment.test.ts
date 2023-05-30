import { BempaggoEstablishmentMinimalResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Establishment entity", () => {

  describe("Response", () => {
    test("establishmentMinimalResponse", async () => {
      const establishmentMinimal: BempaggoEstablishmentMinimalResponse = {
        id: 1
      };

      expect(establishmentMinimal).not.toBeNull();
      assertType<BempaggoEstablishmentMinimalResponse>(establishmentMinimal);
      expect(Object.keys(establishmentMinimal).length).toBe(1);
      expect(establishmentMinimal.id).toBe(1);
      expect(typeof establishmentMinimal.id).toBe("number");
      expect(establishmentMinimal.id).toBeGreaterThan(0);
    });
  });
});
