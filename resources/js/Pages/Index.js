"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const inertia_react_1 = require("@inertiajs/inertia-react");
function Index() {
    let x = "";
    var f = function (a) {
    };
    f(x);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(inertia_react_1.Head, { title: "Welcome" }),
        react_1.default.createElement("h1", null, "Welcome")));
}
exports.default = Index;
