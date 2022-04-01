# Readability for Cloud Run

This is a 30-line wrapper around JSDOM, [Readability](https://github.com/mozilla/readability), and DOMPurify. It accepts anything, ideally HTML, via a POST request and will attempt to extract the document with Readability and then sanitize the output with DOMPurify.

It is meant to be deployed to a public Cloud Run endpoint, for example:

    npx tsc --outDir ./
    gcloud run deploy

When deploying, Cloud Run will ask you for your region and project name. After it builds and deploys a Node image, you can POST to the endpoint and receive sanitized content back.

I worte this to support Media Mail, a project I'm working on to extract the readable content from articles and send them to my Hey inbox.
