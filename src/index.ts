import { Readability } from "@mozilla/readability";
import { JSDOM } from 'jsdom';
import express from 'express';
import createDOMPurify from 'dompurify';

const app = express();

app.post('/', (req: any, res: any) => {
    let data = '';
    req.on('data', (chunk: string) => {
        data += chunk;
    })
    req.on('end', () => {
        const jsdom = new JSDOM(data);
        const reader = new Readability(jsdom.window.document)
        const article = reader.parse()
        const DOMPurify = createDOMPurify(jsdom.window);
        const clean = DOMPurify.sanitize(article?.content || '');

        res.write(clean)
        res.end()
    })
});

const port = parseInt(process.env.PORT || "8080") || 8080;

app.listen(port, () => {
    console.log(`readability listening on port ${port}`);
});

