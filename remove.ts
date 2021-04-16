export async function removeFile(path: string) {
    await Deno.remove(path)
}