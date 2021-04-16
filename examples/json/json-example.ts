import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.4/mod.ts'

const json = await readJSON('./examples/json/data.json') as any

// a New custom json to save
const newData = {
    'image': json.url
}

await writeJSON('./examples/json/post-data.json', newData)