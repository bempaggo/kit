
##Install

npm i

## Testing

Adjusting tokenLayers and url following the environment, in file:  

../src/test/setup.ts
 
Command to test:
cd ../kit/nodejs/bempaggo-kit-layers
npm run test


## Warnings
Comments with TODO are for highlights and review.
	By example:
			...

   
			dueDays: number | null // TODO timestamp ??

   
			lateFee: number | null // TODO flat?

   
			lateInterestRate: number | null // TODO DAY, MONTH ??? PERCENTAGE, FLAT ?

   
			...
			
			
## How to use it


### layers style

import BemPaggoSdk from "@/app/modules/layers/BemPaggoSDK";

const layers: BemPaggoSdk = new BemPaggoSdk(url, tokenLayers);

### Bempaggo SDK 

import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";

import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";

const factory: BempaggoFactory = new BempaggoFactory();
 
const bempaggo: Bempaggo | null = factory.createByUrl(baseURL, "Bearer token");

// OR

const bempaggo: Bempaggo | null = factory.createAsBuild("Bearer token");

// OR

const bempaggo: Bempaggo | null =  factory.create(Environments.SANDBOX, "Bearer token");

