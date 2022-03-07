import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { readImageFromURL } from '../src/image.ts'

const url = 'https://sheetjs.com/sketch128.png'

Deno.test("loads an image", async () => {
    const image = await readImageFromURL(url)
    assertEquals(image.bytes.length, 23325)
    assertEquals(image.name, 'sketch128.png')
})