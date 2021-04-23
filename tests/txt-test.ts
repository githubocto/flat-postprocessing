import { assertStringIncludes } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { readTXT, writeTXT } from '../src/txt.ts'

const txtReadPath = './examples/txt/text.txt'
const jsonWritePath = './examples/txt/text-write2.txt'

Deno.test("reads a txt file", async () => {
    const txt = await readTXT(txtReadPath)
    console.log(txt)

    assertStringIncludes(txt, 'Test file to read');
})

Deno.test("writes a txt file", async () => {
    const content = 'Write to a file'
    await writeTXT(jsonWritePath, content)
    const txt = await readTXT(jsonWritePath)

    assertStringIncludes(txt, content);
})