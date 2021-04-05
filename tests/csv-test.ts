import { assertArrayIncludes } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { loadCSV, writeCSV } from '../csv.ts'

const csvReadPath = './examples/read-example.csv'
const csvWritePath = './examples/write-example.csv'

Deno.test("reads a csv file", async () => {
    const csv = await loadCSV(csvReadPath) as ArrayLike<unknown>

    assertArrayIncludes(csv, [[ "One", "500", "$0.5" ]]);
});

Deno.test("reads a csv file without header", async () => {
    const csv = await loadCSV(csvReadPath, { 
        skipFirstRow: true
    }) as ArrayLike<unknown>

    assertArrayIncludes(csv, [{ Name: "Two", Amount: "13", Price: "$10" }]);
});

Deno.test("writes a csv file", async () => {
    const data = `name,age\nRick,70\nSmith,14`
    await writeCSV(csvWritePath, data)
    const csv = await loadCSV(csvWritePath) as ArrayLike<unknown>

    assertArrayIncludes(csv, [[ "Rick", "70" ]]);
});