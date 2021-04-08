import { loadImage, loadImageBytes } from 'https://deno.land/x/flat@0.0.3/mod.ts'
import { Image } from 'https://cdn.deno.land/imagescript/versions/1.2.0/raw/mod.ts'; // library for image manipulations

const url = 'https://api.creativecommons.engineering/v1/thumbs/c8fe5f5b-cc1a-4794-91c5-7488c60f4914'
const url2 = 'https://live.staticflickr.com/962/41906373431_72c25d0dfd_b.jpg'
const url3 = 'https://i.giphy.com/media/5wWf7HapUvpOumiXZRK/giphy.gif'

// Can specify a filename to rename the image
// (image url, path to save image, image to save name)
await loadImage(url, './examples/image/', 'cat')

// Image will be saved with the default name if not included
await loadImage(url2, './examples/image/')

// Can load gifs, pngs, jpgs
await loadImage(url3, './examples/image/', 'cat-gif')

// Image manipulation example - reading from a file
const bytes = await Deno.readFile('./examples/image/cat.jpeg') // local file
const image = await Image.decode(bytes);
image.crop(image.width/4, image.height/4, image.width/2, image.height/2); // x, y, width, height
await Deno.writeFile('./examples/image/cat-cropped.jpeg', await image.encode());

// Image manipulation example - fetching from a url
const { imageBytes, mimeType } = await loadImageBytes(url) // url
const image2 = await Image.decode(imageBytes);
image2.resize(image2.width/2, image2.height/2)
image2.opacity(0.5).invert()
await Deno.writeFile('./examples/image/cat-resized.jpeg', await image2.encode());
