# flat-postprocessing

A collection of postprocessing utilities for [flat](https://github.com/githubocto/flat).

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

## License

MIT! See LICENSE

