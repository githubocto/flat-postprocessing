import { mime } from "https://cdn.deno.land/mimetypes/versions/v1.0.0/raw/mod.ts"
import { urlParse } from 'https://cdn.deno.land/url_parse/versions/1.0.0/raw/mod.ts';
import { basename } from "https://deno.land/std@0.92.0/path/mod.ts";

export async function loadImageBytes(url: string) {
    const response = await fetch(url); // fetch an image
    const mimeType = response.headers.get('content-type');
    const imageBytes = new Uint8Array(await response.arrayBuffer());
    return { imageBytes, mimeType }
}

export async function loadImage(url: string, path: string, name?: string) {
    const { imageBytes, mimeType } = await loadImageBytes(url)
    const extension = mime.getExtension(mimeType as string);
    let imagePath

    if (name) {
        imagePath = `${path}${name}.${extension}`

    } else {
        let defaultName = basename(urlParse(url).pathname)
        defaultName = defaultName.split('.')[0]
        imagePath = `${path}${defaultName}.${extension}`
    }

    await Deno.writeFile(imagePath, imageBytes); // create a jpg file with Deno
}
