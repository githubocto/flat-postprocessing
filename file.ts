export async function readFile(path: string, encoding = 'utf-8'): Promise<string> {
  const raw = await Deno.readFile(path)
  const decoder = new TextDecoder(encoding)
  return decoder.decode(raw)
}

export async function writeFile(path: string, data: string) {
  const encoder = new TextEncoder()
  await Deno.writeFile(path, encoder.encode(data))
}