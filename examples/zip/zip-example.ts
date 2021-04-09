import { unZipFromFile, unZipFromURL } from '../../zip.ts'

// zip from a local file
// (zip file, destination path)
const result = await unZipFromFile('./examples/zip/zip-folder.zip', './examples/zip')
const output = result ? 'File unzipped successfully' : 'Error unzipping'
console.log(output)

// zip from a URL
// (zip file URL, destination path)
const url = 'https://github.com/githubocto/flat-postprocessing/raw/main/examples/zip/zip-folder.zip' // zip-folder.zip but hosted
const result2 = await unZipFromURL(url, './examples/zip')
const output2 = result2 ? 'File unzipped successfully' : 'Error unzipping'
console.log(output2)