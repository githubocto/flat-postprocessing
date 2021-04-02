export async function loadJSON(path: string, encoding = 'utf-8'): Promise<unknown> {
  const raw = await Deno.readFile(path)
  const decoder = new TextDecoder(encoding)
  return JSON.parse(decoder.decode(raw))
}

export async function writeJSON(path: string, data: any) {
  const encoder = new TextEncoder()
  await Deno.writeFile(path, encoder.encode(JSON.stringify(data)))
}