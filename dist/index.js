"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readability_1 = require("@mozilla/readability");
const jsdom_1 = require("jsdom");
const express_1 = __importDefault(require("express"));
const dompurify_1 = __importDefault(require("dompurify"));
const app = (0, express_1.default)();
app.post('/', (req, res) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        const jsdom = new jsdom_1.JSDOM(data);
        const reader = new readability_1.Readability(jsdom.window.document);
        const article = reader.parse();
        const DOMPurify = (0, dompurify_1.default)(jsdom.window);
        const clean = DOMPurify.sanitize((article === null || article === void 0 ? void 0 : article.content) || '');
        res.write(clean);
        res.end();
    });
});
const port = parseInt(process.env.PORT || "8080") || 8080;
app.listen(port, () => {
    console.log(`readability listening on port ${port}`);
});
