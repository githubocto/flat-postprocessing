export async function readJSON(path: string, encoding = 'utf-8'): Promise<unknown> {
  return JSON.parse(await Deno.readTextFile(path))
}

export async function writeJSON(path: string, data: any) {
  await Deno.writeTextFile(path, JSON.stringify(data))
}