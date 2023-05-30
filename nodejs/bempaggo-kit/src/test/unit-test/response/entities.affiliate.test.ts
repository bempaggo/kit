import { BempaggoAffiliateMinimalResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Affiliate entity", () => {

  describe("Response", () => {
    test("BempaggoAffiliateMinimalResponse", async () => {
      const affiliateMinimal: BempaggoAffiliateMinimalResponse = {
        id: 1,
        name: "Tony Stark",
        businessName: "Stark Industries"
      };

      expect(affiliateMinimal).not.toBeNull();
      assertType<BempaggoAffiliateMinimalResponse>(affiliateMinimal);
      expect(Object.keys(affiliateMinimal).length).toBe(3);
      expect(affiliateMinimal.id).toBe(1);
      expect(affiliateMinimal.name).toBe("Tony Stark");
      expect(affiliateMinimal.businessName).toBe("Stark Industries");
    });
  });
});
