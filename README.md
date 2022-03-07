# Flat Data: Postprocessing Library and Examples

A collection of postprocessing [helper functions](https://deno.land/x/flat/mod.ts) and examples for [Flat Data](https://octo.github.com/projects/flat-data).

These examples and functions are written in [Deno](https://deno.land/), a new language created by the same founders of Node.js and meant to improve on many aspects of Node. 

> Note: If you're noticing your scripts failing recently, try updating to `0.0.15`. [More info here](https://github.com/githubocto/flat/issues/67#issuecomment-1025911772)

## Usage

When writing a [Flat Data]() Action, you can specify a path to a postprocessing Deno script that can manipulate the data downloaded by Flat even further. 

```yaml
- name: Fetch data 
        uses: githubocto/flat@v2
        with:
          http_url: http://api.coindesk.com/v2/bpi/currentprice.json # The endpoint to fetch
          downloaded_filename: btc-price.json # The http_url gets saved and renamed in our repository as btc-price.json
          postprocess: postprocess.ts # A postprocessing javascript or typescript file written in Deno
```

This is an example of a postprocessing script. Notice the use of `Deno.args[0]` to pass in the path of the `downloaded_filename`.

```ts
// The Flat Data postprocessing libraries can be found at https://deno.land/x/flat/mod.ts
// Replace 'x' with latest library version
import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.x/mod.ts'

const filename = Deno.args[0] // equivalent to writing `const filename = 'btc-price.json'`
const data = await readJSON(filename)

// pluck a specific key off and write it out to a new file
const newfile = `postprocessed_${filename}`
await writeJSON(newfile, data.path.to.something)
```

## Examples

Can be found in the examples folder. Once you [install Deno](https://deno.land/) you can run these examples with:

* `deno run -A examples/csv/csv-example.ts`
* `deno run -A examples/csv/arquero-example.ts`
* `deno run -A --unstable examples/image/image-example.ts`
* `deno run -A examples/json/json-example.ts`
* `deno run -A examples/sheets/sheets-example.ts`
* `deno run -A examples/xlsx/xlsx-example.ts`
* `deno run -A --unstable examples/zip/zip-example.ts`

Deno can run javascript or typescript files, so you can easily convert any of these examples to javascript and run them in the same way:

`deno run -A examples/csv/csv-example.js`

## Using Python

While our examples use a Deno file to run postprocessing tasks, you can also use Python as specified in this example: [https://github.com/pierrotsmnrd/flat_data_py_example](https://github.com/pierrotsmnrd/flat_data_py_example). Thank you [@pierrotsmnrd](https://github.com/pierrotsmnrd)!

## Using bash

You can also use bash as specified in this example: [https://github.com/aborruso/flat_data_bash_example](https://github.com/aborruso/flat_data_bash_example). By [@aborruso](https://twitter.com/aborruso)

## Postprocessing Library

The Flat Data postprocessing library can be found at: [https://deno.land/x/flat/mod.ts](https://deno.land/x/flat/mod.ts)

You can import and use these helper functions directly, or treat them as a starting point for writing your own postprocessing scripts.

### CSV

#### readCSV

```ts
readCSV(path: string, options?: ParseOptions): Promise<Record<string, unknown>[]>
```

Args:

* **path:** path to a local CSV file
* **options:** [options](https://deno.land/std@0.92.0/encoding#codeparseoptionscode) for parsing the CSV file

Usage:

`const csv = await readCSV('./path/to/file.csv')`

#### writeCSV

```ts
writeCSV(path: string, data: Record<string, unknown>[] | string, options?: Deno.WriteFileOptions)
```

Args:

* **path**: path to a local CSV file
* **data**: string or object array to store
* **options**: [options](https://doc.deno.land/builtin/stable#Deno.WriteFileOptions) for writing the CSV file

Usage:

```ts
const data = [ 
	{ age: 70, name: 'Rick' },
	{ age: 14, name: 'Smith' }
]
await writeCSV('./path/to/file.csv', data)
```

### TXT

#### readTXT

```ts
readTXT(path: string): string
```

Args:

* **path**: path to a local TXT file


Usage: 

```ts
const text = await readTXT('./path/to/file.txt')
```

#### writeTXT

```ts
writeTXT(path: string, text: string, options?: Deno.WriteFileOptions): void
```

Args:

* **path**: path to a local TXT file
* **text**: text to write to file
* **options**: [options](https://doc.deno.land/builtin/stable#Deno.WriteFileOptions) for writing the TXT file

Usage:

```ts
await writeTXT('./path/to/file.txt', 'Content for the file')
```

### JSON


#### readJSON

```ts
readJSON(path: string): JSON
```

Args:

* **path**: path to a local JSON file


Usage: 

```ts
const json = await readJSON('./path/to/file.json')
```

#### readJSONFromURL

```ts
readJSONFromURL(url: string): JSON
```

Args:

* **url**: URL to a json file


Usage: 

```ts
const json = await readJSON('www.url.com/file.json')
```

#### writeJSON

```ts
writeJSON(path: string, data: any, replacer?: any, space?: string | number): void


```

Args:

* **path**: path to a local JSON file
* **data**: data to store as JSON
* **replacer**: [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters) function that transforms the results or an array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified
* **space**: adds indentation, white space, and line break characters to the to the JSON text to make it easier to read.


Usage: 

```ts
const data = { age: 40 }
await writeJSON('./path/to/file.json', data)

await writeJSON('./path/to/file-with-indentation', data, null, 2)
```

### XLSX

Our library relies on [SheetJS](https://github.com/SheetJS/sheetjs), a library for parsing various spreadsheet formats. In addition to a simple `readXLSX` function you can access the core `xlsx` module by importing it directly.

```ts
import { xlsx, readXLSX } from 'https://deno.land/x/flat/mod.ts'
```

`xlsx` provides many more [utility functions](https://github.com/SheetJS/sheetjs). 


#### readXLSX

```ts
readXLSX(path: string): XLSX.WorkBook
```

Args:

* **path**: path to a local XLSX file


Usage: 

```ts
const workbook = await readXLSX('./path/to/file.xlsx')
const sheetData = workbook.Sheets[workbook.SheetNames[0]]
const csvString = await xlsx.utils.sheet_to_csv(sheetData)
```


### Image

We recommend using a library like [imagescript](https://deno.land/x/imagescript) for more advanced image manipulation. See an example [here](https://github.com/githubocto/flat-postprocessing/blob/main/examples/image/image-example.ts).

#### readImageFromFile

```ts
readImageFromFile(path: string): Promise<Uint8Array>
```

Args:

* **path**: path to a local image file


Usage: 

```ts
const bytes = await readImageFromFile('./path/to/image.jpeg')
```


#### readImageFromURL

```ts
readImageFromURL(url: string): Promise<{ bytes: Uint8Array; name: string; }>
```

Args:

* **url**: url string to an image

Usage: 

```ts
const image = await readImageFromURL('www.url.com/image.jpg')
const bytes = image.bytes
const name = image.name
```

#### writeImage

```ts
writeImage(imageBytes: Uint8Array, path: string): void
```

Args:

* **imageBytes**: a byte array
* **path**: path and name to write the image file


Usage: 

```ts
await writeImage(bytes, './path/to/image.jpeg')
```

### Zip

#### unZipFromFile

```ts
unZipFromFile(
    filePath: string,
    destinationPath: string | null = "./",
    options: any = {},
): Promise<string | false>
```

Args:

* **filePath**: a path to a local zip file
* **destinationPath**: a folder path to unzip the files
* **options**: option.includeFileName can be true or false


Usage: 

```ts
const result = await unZipFromFile('./path/to/folder.zip', './unzip/path')
const output = result ? 'File unzipped successfully' : 'Error unzipping'
```

#### unZipFromURL
```ts
unZipFromURL(
    fileURL: string,
    destinationPath: string | null = "./",
    options: any = {},
): Promise<string | false>
```

Args:

* **filePath**: a path to a local zip file
* **destinationPath**: a folder path to unzip the files
* **options**: option.includeFileName can be true or false

Usage: 

```ts
const result = await unZipFromURL('www.url.com/file.zip', './unzip/path')
const output = result ? 'File unzipped successfully' : 'Error unzipping'
```


### Remove

#### removeFile

```ts
removeFile(path: string): void
```

Args:

* **path**: path to a local file to delete


Usage: 

```ts
await removeFile('/path/to/file.x')
```

## Testing

Run all the tests:

`deno test -A --unstable tests/*`

Run separate tests

`deno test -A --unstable tests/csv-test.ts`


## License

[MIT](LICENSE)

