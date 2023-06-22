import { BempaggoAffiliateMinimalResponse } from "@/app/modules/entity/BempaggoResponse";
import { assert } from "chai";
import { describe, test } from "node:test";


describe("Affiliate entity", () => {
  describe("Response", () => {
    test("BempaggoAffiliateMinimalResponse", async () => {
      const affiliateMinimal: BempaggoAffiliateMinimalResponse = {
        id: 1,
        name: "Tony Stark",
        businessName: "Stark Industries"
      };
      assert.equal(3, Object.keys(affiliateMinimal).length);
      assert.equal(1, affiliateMinimal.id);
      assert.equal("Tony Stark", affiliateMinimal.name);
      assert.equal("Stark Industries", affiliateMinimal.businessName);
    });
  });
});

