import { readImageFromFile, readImageFromURL, writeImage } from '../../src/image.ts' // replace with latest library https://deno.land/x/flat@0.0.x/mod.ts
import { Image } from 'https://cdn.deno.land/imagescript/versions/1.2.0/raw/mod.ts'; // library for image manipulations

const url1 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/800px-Felis_catus-cat_on_snow.jpg'
const url2 = 'https://live.staticflickr.com/962/41906373431_72c25d0dfd_b.jpg'
const url3 = 'https://i.giphy.com/media/5wWf7HapUvpOumiXZRK/giphy.gif'

// Read different images from a url
const image1 = await readImageFromURL(url1)
// (bytes, path, name)
await writeImage(image1.bytes, './examples/image/cat.jpeg') // custom name

const image2 = await readImageFromURL(url2)
await writeImage(image2.bytes, `./examples/image/${image2.name}`) // default image name

const image3 = await readImageFromURL(url3)
await writeImage(image3.bytes, `./examples/image/${image3.name}`)

// Image manipulation example - reading from a file
const bytes = await readImageFromFile('./examples/image/cat.jpeg') // local file
const image = await Image.decode(bytes);
image.crop(image.width/4, image.height/4, image.width/2, image.height/2); // x, y, width, height
const newImageBytes = await image.encode()
await writeImage(newImageBytes, './examples/image/cat-cropped.jpeg')