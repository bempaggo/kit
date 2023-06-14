import { BempaggoEstablishmentMinimalResponse } from "@/app/modules/entity/BempaggoResponse";
import { assert, assertType, describe, test } from "vitest";

describe("Establishment entity", () => {

  describe("Response", () => {
    test("establishmentMinimalResponse", async () => {
      const establishmentMinimal: BempaggoEstablishmentMinimalResponse = {
        id: 1
      };

      assertType<BempaggoEstablishmentMinimalResponse>(establishmentMinimal);
      assert.equal(1, Object.keys(establishmentMinimal).length);
      assert.equal(1, establishmentMinimal.id);
    });
  });
});
