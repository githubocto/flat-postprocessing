import { assertNotEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { unZipFromFile } from '../src/zip.ts'

Deno.test("unzips a folder", async () => {
    const result = await unZipFromFile('./examples/zip/zip-folder.zip', './examples/zip')

    assertNotEquals(result, false)
})