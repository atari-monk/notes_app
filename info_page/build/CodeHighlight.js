"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_js_1 = __importDefault(require("highlight.js"));
class CodeHighlight {
    render(item) {
        highlight_js_1.default.highlightElement(item);
    }
}
exports.default = CodeHighlight;
