import { BempaggoAffiliateMinimalResponse } from "@/app/modules/entity/BempaggoResponse";
import { assert, assertType, describe, test } from "vitest";

describe("Affiliate entity", () => {
  describe("Response", () => {
    test("BempaggoAffiliateMinimalResponse", async () => {
      const affiliateMinimal: BempaggoAffiliateMinimalResponse = {
        id: 1,
        name: "Tony Stark",
        businessName: "Stark Industries"
      };

      assertType<BempaggoAffiliateMinimalResponse>(affiliateMinimal);
      assert.equal(Object.keys(affiliateMinimal).length, 3);
      assert.equal(affiliateMinimal.id, 1);
      assert.equal(affiliateMinimal.name, "Tony Stark");
      assert.equal(affiliateMinimal.businessName, "Stark Industries");
    });
  });
});

