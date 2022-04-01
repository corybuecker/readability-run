# Readability for Cloud Run

This is a 30-line wrapper around JSOM, [Readability](https://github.com/mozilla/readability), and DOMPurify. It accepts anything, ideally HTML, via a POST request and will attempt to extract the document with Readability and then sanitize the output with DOMPurify.

It is meant to be deployed to a public Cloud Run endpoint, for example:

    npx tsc --outDir ./
    gcloud run deploy

When deploying, Cloud Run will ask you for your region and project name. After it builds a Node image and deploys it, you can POST to the endpoint and receive sanitized content back.
