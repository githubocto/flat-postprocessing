# Flat Data: Postprocessing Library and Examples

A collection of postprocessing [helper functions](https://deno.land/x/flat/mod.ts) and examples for [Flat Data](https://github.com/githubocto/flat).

These examples and functions are written in [Deno](https://deno.land/), a new language created by the same founders of Node.js and meant to improve on many aspects of Node. 

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

## Postprocessing Library

The Flat Data postprocessing library can be found at: [https://deno.land/x/flat/mod.ts](https://deno.land/x/flat/mod.ts)

You can import and use these helper functions directly, or treat them as a starting point for writing your own postprocessing scripts.

### CSV

TBD API

### TXT

TBD API

### JSON

TBD API

### XLSX

TBD API

### Image

TBD API

### Zip

TBD API

### Remove

TBD API

## Testing

Run all the tests:

`deno test -A --unstable tests/*`

Run separate tests

`deno test -A tests/csv-test.ts`


## License

[MIT](LICENSE)

