import { html } from "@popeindustries/lit-html-server";
import { HTMLTemplateData } from "./html";

/**
 * Takes given html template data and puts it in a common layout with a header and footer
 */
export function basicLayout(htmlTemplateData: HTMLTemplateData): HTMLTemplateData {
    const newHeaders = html`
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        ${htmlTemplateData.head}`

    const bodyInLayout = html`${htmlTemplateData.body}`;

    return {...htmlTemplateData,
        head: newHeaders,
        body: bodyInLayout,
    }
}
