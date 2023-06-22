import { BempaggoEstablishmentMinimalResponse } from "@/app/modules/entity/BempaggoResponse";
import assert from "assert";
import { describe, test } from "node:test";
describe("Establishment entity", () => {

  describe("Response", () => {
    test("establishmentMinimalResponse", async () => {
      const establishmentMinimal: BempaggoEstablishmentMinimalResponse = {
        id: 1
      };

      assert.equal(1, Object.keys(establishmentMinimal).length);
      assert.equal(1, establishmentMinimal.id);
    });
  });
});
