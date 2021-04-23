import { mime } from "https://cdn.deno.land/mimetypes/versions/v1.0.0/raw/mod.ts"
import { urlParse } from 'https://cdn.deno.land/url_parse/versions/1.0.0/raw/mod.ts';
import { basename } from "https://deno.land/std@0.92.0/path/mod.ts";

export async function readImageFromURL(url: string) {
    const response = await fetch(url); // fetch an image
    const mimeType = response.headers.get('content-type');
    const imageBytes = new Uint8Array(await response.arrayBuffer());

    const extension = mime.getExtension(mimeType as string);
    const defaultName = basename(urlParse(url).pathname)
    let defaultImageName = defaultName

    // if image name does NOT include an extension
    if (mime.getType(defaultName) === undefined) {
        defaultImageName = `${defaultName.split('.')[0]}.${extension}`
    }
    
    return { bytes: imageBytes, name: defaultImageName }
}

export async function readImageFromFile(path: string) {
    const bytes = await Deno.readFile(path) // local file
    return bytes
}

export async function writeImage(imageBytes: Uint8Array, path: string, name?: string) {
    const imagePath = `${path}${name}`
    await Deno.writeFile(imagePath, imageBytes);
}
