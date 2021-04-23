import { assertObjectMatch } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { readJSON, writeJSON } from '../src/json.ts'

const jsonReadPath = './examples/json/data.json'
const jsonWritePath = './examples/json/json-test.json'

Deno.test("reads a json file", async () => {
    const json = await readJSON(jsonReadPath)

    assertObjectMatch(json, { media_type: "image", service_version: "v1" });
})

Deno.test("writes a json file", async () => {
    const data = {
        prices: '$20',
        name: 'table'
    }
    await writeJSON(jsonWritePath, data)
    const json = await readJSON(jsonWritePath)

    assertObjectMatch(json, { prices: "$20", name: "table" });
})