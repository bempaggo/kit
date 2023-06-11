"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulation = exports.layers = void 0;
const BemPaggoSDK_1 = __importDefault(require("@/app/modules/layers/BemPaggoSDK"));
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY1MTU0NDIsImV4cCI6MTY4NjU3NTQ0Mn0.DqwX40qVyhvlqJKgHIkfOsnmKuR37FGOi9ItdgXLN-jnoBum-HYl8d96eqfQ3GitzFIg5oFP5vsgavz9_pHdow";
const url = "http://localhost:5000/api";
const layers = new BemPaggoSDK_1.default(url, token);
exports.layers = layers;
const simulation = async (chargeId) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    await fetch(`${url}/v2/charges/${chargeId}/simulation`, { method: "POST", headers });
};
exports.simulation = simulation;
//# sourceMappingURL=setup.js.map