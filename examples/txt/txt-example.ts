import { readTXT, writeTXT } from '../../src/txt.ts' // replace with latest library https://deno.land/x/flat@0.0.x/mod.ts
  
// Path to a csv file
const readTXTPath = './examples/txt/text.txt'
const writeTXTPath = './examples/txt/text-write.txt'
const content = 'Writing test'

// read from a text file
const text = await readTXT(readTXTPath)
console.log(text)

// write a text file
await writeTXT(writeTXTPath, content)