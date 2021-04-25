import { readJSON, writeJSON } from '../../src/json.ts' // replace with latest library https://deno.land/x/flat@0.0.x/mod.ts

const json = await readJSON('./examples/json/data.json')

// a New custom json to save
const newData = {
    'image': json.url
}

await writeJSON('./examples/json/post-data.json', newData)