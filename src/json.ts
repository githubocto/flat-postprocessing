export async function readJSON(path: string) {
  const text = await Deno.readTextFile(path)
  return JSON.parse(text)
}

export async function writeJSON(path: string, ...args: Parameters<typeof JSON.stringify>) {
  await Deno.writeTextFile(path, JSON.stringify(...args))
}

export async function readJSONFromURL(url: string) {
  const response = await fetch(url)
  const json = await response.json()
  return json
}