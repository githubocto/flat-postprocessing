import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { existsSync } from 'https://deno.land/std/fs/mod.ts';
import { removeFile } from '../src/remove.ts'

const path = './tests/test.txt'

Deno.test("removes file correctly", async () => {
    await Deno.writeTextFile('./tests/test.txt', 'This is a test file')
    await removeFile(path)
    const doesFileExist = existsSync(path)

    assertEquals(doesFileExist, false)
})