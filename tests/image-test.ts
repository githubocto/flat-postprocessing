import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { loadImage } from '../image.ts'

const url = 'https://api.creativecommons.engineering/v1/thumbs/c8fe5f5b-cc1a-4794-91c5-7488c60f4914'

Deno.test("loads an image", async () => {
    await loadImage(url, './examples/image/', 'cat')
    const bytes = await Deno.readFile('./examples/image/cat.jpeg') // local file
    assertEquals(bytes.length, 76507)
});