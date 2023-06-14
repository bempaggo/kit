"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulation = exports.layers = void 0;
const BemPaggoSDK_1 = __importDefault(require("@/app/modules/layers/BemPaggoSDK"));
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY2NzA2NjksImV4cCI6MTY4NjczMDY2OX0.MYnnG2jOPY7khETUzZLSq1O_TIeEs1WE2wb8opUAX4pzyjgfZk4VgZqcdJJKKOgxwryDSowfI9BmJD4SlhrOBg";
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