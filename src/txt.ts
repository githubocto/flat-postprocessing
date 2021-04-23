export async function readTXT(path: string) {
    const text = await Deno.readTextFile(path)
    return text
}
  
export async function writeTXT(path: string, text: string) {
    await Deno.writeTextFile(path, text)
}
