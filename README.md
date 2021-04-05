# flat-postprocessing

A collection of postprocessing examples for [flat](https://github.com/githubocto/flat). You can import and use them directly, or treat them as a starting point for writing your own postprocessing scripts.

## Usage

Your postprocessing scripts must read from the path passed as the first invocation argument, and print out the path to the processed data.

The functions exported here are helpers to cut down on boilerplate.

```ts
import {readJSON, writeJSON} from 'https://deno.land/x/flat/mod.ts'

const filename = Deno.args[0]
const data = await readJSON(filename)
// pluck a specific key off
// and write it out to a different file
const newfile = `subset_of_${filename}`
await writeJSON(newfile, data.path.to.something)
console.log(newfile)
```

## Examples

Can be found in the examples folder:

* `deno run --allow-read --allow-write examples/csv-example.ts`
* `deno run --allow-read --allow-write examples/arquero-example.ts`

## Testing

Run all the tests:

`deno test --allow-read --allow-write tests/*`

Run separate tests

`deno test --allow-read --allow-write tests/csv-test.ts`


## License

MIT! See LICENSE

