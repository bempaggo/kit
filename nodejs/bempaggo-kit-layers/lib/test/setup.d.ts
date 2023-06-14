import BemPaggoSdk from "@/app/modules/layers/BemPaggoSDK";
declare const layers: BemPaggoSdk;
declare const simulation: (chargeId: number) => Promise<void>;
export { layers, simulation };
