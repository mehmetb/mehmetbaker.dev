import { html } from "@popeindustries/lit-html-server";

export interface HTMLTemplateData {
    head?: any,
    body?: any
    title?: string
}

export function htmlDocumentTemplate(data: HTMLTemplateData) {
    return html`<!DOCTYPE html>
<html>
    <head lang="en">
        <meta charset="utf-8">
        ${data.title ? html`<title>${data.title}</title>` : undefined}
        ${data.head}
    </head>
    <body>
        ${data.body}
    </body>
</html>`
}
