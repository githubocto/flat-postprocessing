export async function readJSON(path: string) {
  return JSON.parse(await Deno.readTextFile(path))
}

export async function writeJSON(path: string, data: any) {
  await Deno.writeTextFile(path, JSON.stringify(data))
}

export async function readJSONFromURL(url: string) {
  const response = await fetch(url)
  const json = await response.json()
  return json
}